import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import axios from "axios";
import ChatHeader from "./ChatHeader";
import jwtDecode from "jwt-decode";

const MainChatComponent = ({ selectedChatId, chats }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const stompClient = useRef(null);

  useEffect(() => {
    if (selectedChatId) {
      const fetchRoomName = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/chatroom/${selectedChatId}`);
          console.log("API Response:", response);
          if (response.data && response.data.data.roomName) {
            console.log("Room Name:", response.data.data.roomName);
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
    if (selectedChatId && roomName) {
      const socket = new WebSocket("ws://localhost:8080/portfolio");
      stompClient.current = Stomp.over(socket);

      stompClient.current.connect({}, (frame) => {
        console.log("Connected:", frame);

        stompClient.subscribe(`/topic/${roomName}`, (messageOutput) => {
          console.log("수신된 message:", messageOutput.body);
          setMessages((prevMessages) => [...prevMessages, JSON.parse(messageOutput.body)]);
        });
      });

      return () => {
        if (stompClient.current) {
          stompClient.current.disconnect();
        }
      };
    }
  }, [selectedChatId, roomName]);

  const [tempDisplay, setTempDisplay] = useState([]);

  const sendMessage = () => {
    if (stompClient.current && message) {
      const token = Cookies.get("Authorization");
      const decodedToken = jwtDecode(token);
      const nickname = decodedToken.sub;

      const messagePayload = {
        roomName: roomName,
        senderId: nickname,
        message: message,
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [roomName]: [...(prevMessages[roomName] || []), `${messagePayload.senderId}: ${messagePayload.message}`],
      }));
      console.log("JWT 토큰:", token);

      stompClient.send({
        destination: `/topic/${roomName}`, // 동적으로 roomName을 대체
        headers: {
          Authorization: `${token}`, // JWT 토큰
        },
        body: JSON.stringify(messagePayload),
      });

      setMessage("");
    } else {
      console.error("STOMP 클라이언트가 연결되지 않았거나 메시지가 비어 있습니다.");
    }
  };

  return (
    <ChatWrapper>
      <ChatHeader roomName={roomName} selectedChatId={selectedChatId} />
      <MessageArea>
        {messages[roomName]?.map((msg, index) => {
          const [sender, messageContent] = msg.split(": ");
          return (
            <MessageItem key={index}>
              <SenderName>{sender}</SenderName>
              <MessageBubble>{messageContent}</MessageBubble>
            </MessageItem>
          );
        })}
      </MessageArea>
      <InputWrapper>
        <MessageInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim() !== "") {
              sendMessage();
            }
          }}
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
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
`;

const MessageBubble = styled.div`
  padding: 10px;
  border-radius: 10px;
  max-width: 100%;
  word-wrap: break-word;
  background-color: ${(props) => (props.isSender ? "#0B9B88" : "#67fc99")};
  color: ${(props) => (props.isSender ? "#000" : "#877c78")};
  align-self: ${(props) => (props.isSender ? "flex-start" : "flex-end")};
`;

const SenderName = styled.div`
  color: #555;
  align-self: flex-end;
  margin-bottom: 5px;
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 10px;
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
  background-color: gray;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #67fc99;
  }
`;
