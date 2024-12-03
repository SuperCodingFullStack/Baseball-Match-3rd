import React, { useState } from "react";
import styled from "styled-components";
import apiClient from "../../../pages/Login/apiClient";

const Sidebar = ({ isVisible, toggleSidebar, roomId }) => {
  const mockFriends = [
    { id: 1, name: "친구 1" },
    { id: 2, name: "친구 2" },
    { id: 3, name: "친구 3" },
    { id: 4, name: "친구 4" },
  ];

  const handleInvite = () => {
    // 초대 API 호출
    alert("초대 API 호출 예정");
  };

  // 채팅방 나가기
  const handleGetOutRoom = async () => {
    if (!roomId) {
      console.error("roomId가 없습니다.");
      return;
    }
    try {
      const response = await apiClient.delete(
        `/api/chatroom/rooms/${roomId}/leave`
      );
      if (response.status === 200) {
        alert("채팅방에서 나왔습니다.");
      }
    } catch (error) {
      console.error("채팅방 나가기 에러:", error);
    }
  };

  return (
    <SidebarContainer isVisible={isVisible}>
      <Content>
        <h3>친구 목록</h3>
        <FriendList>
          {mockFriends.map((friend) => (
            <FriendItem key={friend.id}>
              <label>
                <input type="checkbox" value={friend.id} />
                {friend.name}
              </label>
            </FriendItem>
          ))}
        </FriendList>
        <ButtonArea>
          <ActionButton onClick={handleInvite}>초대</ActionButton>
          <ActionButton onClick={handleGetOutRoom}>나가기</ActionButton>
        </ButtonArea>
      </Content>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  position: absolute;
  top: 175px;
  right: 0;
  width: 300px;
  height: calc(700px - 85px);
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${({ isVisible }) =>
    isVisible ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FriendList = styled.ul`
  list-style: none;
  padding: 0;
  overflow-y: auto;
  flex-grow: 1;
`;

const FriendItem = styled.li`
  margin-bottom: 10px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid gray;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #67fc99;
  }
`;
