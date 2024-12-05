// 채팅방 전체 레이아웃
import React, { useState } from "react";
import styled from "styled-components";
import ChatSidebar from "./Sidebar/ChatSidebar";
import MainChatComponent from "./ChatBar/MainChatComponent";
import Header from "../MainPage/Header/Header";

const ChatComponent = ({ userId }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <ChatSidebar userId={userId} onSelectChat={handleSelectChat} />
        <MainChatComponent selectedChatId={selectedChatId} chats={chats} />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ChatComponent;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  height: 100vh;
  background-color: #f1f5f9;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 90px;
  flex-grow: 1;
`;
