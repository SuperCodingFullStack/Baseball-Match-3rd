import React, { useState } from "react";
import styled from "styled-components";

const ListSection = ({
  chats,
  handleSelectChat,
  handleCheckboxClick,
  selectedChatIds,
  showCheckboxes,
}) => {
  console.log(chats);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const onChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <ChatListWrap className="chat_list_wrap">
      <ChatList className="chat_list">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            onClick={() => handleSelectChat(chat.id)}
            selected={selectedChatId === chat.id}
          >
            {showCheckboxes && (
              <input
                type="checkbox"
                checked={selectedChatIds.includes(chat.id)}
                onChange={() => handleCheckboxClick(chat.id)}
              />
            )}
            <InfoArea className="info_area">
              <TextWrap className="text_wrap">
                <NameArea className="name_area">
                  <Name>{chat.roomName}</Name> {/* roomName만 표시 */}
                  <DateArea>{chat.createdDate}</DateArea>
                </NameArea>
                <Message className="text_area">{chat.message}</Message>
              </TextWrap>
            </InfoArea>
          </ChatItem>
        ))}
      </ChatList>
    </ChatListWrap>
  );
};

export default ListSection;

const ChatListWrap = styled.div`
  width: 300px;
  height: 550px;
  border-right: 1px solid #efeff0;
  display: flex;
  flex-direction: column;
`;

const ChatList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ChatItem = styled.li`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#67fc99" : "transparent")};
  width: 255px;
  height: 50px;
  overflow: hidden;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px; /* 가로 크기 고정 */
  height: 50px; /* 세로 크기 고정 */
  position: relative;
`;

const NameArea = styled.div`
  display: flex;
  justify-content: space-between; /* name과 date를 한 줄로 배치 */
  width: 100%;
`;

const DateArea = styled.span`
  font-size: 12px;
  color: #999;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const Message = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 15px;
`;
