import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import axios from "axios";
import ChatHeader from "./ChatHeader";

const MainChatComponent = ({ selectedChatId, chats }) => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  console.log("Selected Chat ID: ", selectedChatId);

  useEffect(() => {
    console.log("Fetching room name for Chat ID:", selectedChatId);
    if (selectedChatId) {
      const fetchRoomName = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/chatroom/${selectedChatId}`
          );
          console.log("API Response:", response);
          if (response.data && response.data.data.roomName) {
            console.log("Room Name:", response.data.data.roomName); // roomName만 따로 로그
            setRoomName(response.data.data.roomName);
          }
        } catch (error) {
          if (error.response) {
            // 서버가 응답을 반환했지만 오류 코드가 있는 경우
            console.error("Error Response:", error.response);
          } else if (error.request) {
            // 요청이 서버에 도달하지 않았을 때
            console.error("Error Request:", error.request);
          } else {
            // 요청을 만들 때 오류가 발생했을 경우
            console.error("Error Message:", error.message);
          }
        }
      };

      fetchRoomName();
    }
  }, [selectedChatId]);

  useEffect(() => {
    console.log("Selected Chat ID: ", selectedChatId);
    if (!selectedChatId) return; // 채팅방이 선택되지 않으면 아무것도 하지 않음

    const socket = new WebSocket("ws://localhost:8080/portfolio"); // WebSocket 엔드포인트
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      stompClient.subscribe(`/topic/${roomName}`, (response) => {
        // 수정된 부분
        const incomingMessage = JSON.parse(response.body);
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      });

      setStompClient(stompClient);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, [selectedChatId, roomName]); // 채팅방이 변경될 때마다 웹소켓 연결을 새로 설정

  const sendMessage = () => {
    if (stompClient && message) {
      const token = Cookies.get("Authorization");
      const userId = Cookies.get("userId");
      const nickName = Cookies.get("nickname");

      const messagePayload = {
        roomName: roomName,
        senderId: userId,
        sender: nickName,
        message: message,
      };

      stompClient.send(
        `/app/chat/${roomName}`, // 수정된 부분
        {
          Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
        },
        JSON.stringify(messagePayload)
      );
      setMessage("");
    }
  };

  return (
    <ChatWrapper>
      <ChatHeader roomName={roomName} roomId={selectedChatId} />
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

export default MainChatComponent;

const ChatWrapper = styled.div`
  width: 550px;
  height: 720px;
  margin-top: 20px;
  border-left: 1px solid #efeff0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f5f5f5;
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
