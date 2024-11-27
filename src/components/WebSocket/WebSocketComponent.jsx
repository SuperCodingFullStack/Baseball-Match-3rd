import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import styled from "styled-components";

const WebSocketComponent = ({ roomId, currentUser }) => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const roomName = "portfolio"; // 채팅방 이름 (예시)

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/portfolio"); // WebSocket 엔드포인트
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      // 메시지 구독
      console.log("Connected: " + frame);
      stompClient.subscribe(`/topic/${roomName}`, (response) => {
        const incomingMessage = JSON.parse(response.body);
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      });

      setStompClient(stompClient);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && message) {
      // 메시지 전송
      const messagePayload = {
        roomName: roomName,
        senderId: 1, // 임시 senderId
        sender: "User1", // 임시 sender name
        message: message,
      };

      stompClient.send(
        `/app/chat/${roomName}`,
        {},
        JSON.stringify(messagePayload)
      );
      setMessage("");
    }
  };

  return (
    <ChatWrapper>
      <MessageArea>
        {messages.map((msg, index) => (
          <MessageBubble key={index} isSender={msg.sender === "User1"}>
            <strong>{msg.sender}:</strong> {msg.message}
          </MessageBubble>
        ))}
      </MessageArea>
      <InputWrapper>
        <MessageInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </InputWrapper>
    </ChatWrapper>
  );
};

export default WebSocketComponent;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f8f8f8;
`;

const MessageArea = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageBubble = styled.div`
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
  background-color: ${(props) => (props.isSender ? "#0B9B88" : "#e5e5e5")};
  color: ${(props) => (props.isSender ? "#fff" : "#000")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #0b9b88;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #077e67;
  }
`;
