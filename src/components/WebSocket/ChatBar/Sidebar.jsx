import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../../../pages/Login/apiClient";
import axios from "axios";

const Sidebar = ({ isVisible, toggleSidebar, selectedChatId }) => {
  const [users, setUsers] = useState([]);
  const [selectUsers, setSelectUsers] = useState([]);
  const [inviteMessages, setInviteMessages] = useState([]);

  // 유저 조회
  useEffect(() => {
    if (!selectedChatId) {
      return;
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/chatroom/users/${selectedChatId}`
        );
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("유저 목록을 가져오는 중 에러가 나왔습니다 : ", error);
      }
    };
    getUsers();
  }, [selectedChatId]);

  // 체크박스
  const handleCheckboxChange = (userId) => {
    setSelectUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // 초대 Api
  const handleInvite = async () => {
    if (selectUsers.length === 0) {
      alert("초대할 친구를 선택해주세요.");
      return;
    }
    try {
      const response = await apiClient.post(
        `/api/chatroom/invite/${selectedChatId}`,
        {
          inviteeUserId: selectUsers,
        }
      );
      if (response.status === 200) {
        alert("초대가 성공적으로 완료되었습니다.");
        const invitedNicknames = users
          .filter((user) => selectUsers.includes(user.id))
          .map((user) => user.nickname);

        setInviteMessages(invitedNicknames); // 초대 메시지 업데이트
        setSelectUsers([]);
      }
    } catch (error) {
      console.error("초대 API 호출 에러:", error);
      alert("초대 중 문제가 발생했습니다.");
    }
  };

  // 채팅방 나가기
  const handleGetOutRoom = async () => {
    if (!selectedChatId) {
      console.error("selectedChatId가 없습니다.");
      return;
    }
    try {
      const response = await apiClient.delete(
        `/api/chatroom/rooms/${selectedChatId}/leave`
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
        <h3>초대할 수 있는 유저 목록</h3>
        <FriendList>
          {users.map((user) => (
            <FriendItem key={user.id}>
              <label>
                <input
                  type="checkbox"
                  value={user.id}
                  onChange={() => handleCheckboxChange(user.id)}
                  checked={selectUsers.includes(user.id)}
                />
                <span>{user.nickname}</span>
              </label>
            </FriendItem>
          ))}
        </FriendList>

        <InviteMessages>
          {inviteMessages.map((nickname, index) => (
            <p key={index}>{nickname} 님이 초대되었습니다!</p>
          ))}
        </InviteMessages>
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
  position: fixed;
  top: 175px;
  width: 300px;
  height: calc(700px - 95px);
  left: 50%;
  transform: translateX(55%);
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  background-color: #f8f9fa;
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

const FriendItem = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 270px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;

  cursor: pointer;

  &:hover {
    background-color: #e2f8e0;
  }

  label {
    display: flex;
    align-items: center;
    width: 100%;
  }

  input[type="checkbox"] {
    margin-right: 80px;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  width: 100%;
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

const InviteMessages = styled.div`
  margin-top: 20px;
  color: #67fc99;
  background-color: #f8f9fa;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
`;
