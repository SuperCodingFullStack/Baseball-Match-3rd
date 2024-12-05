import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchSection from "./SearchSection";
import ListSection from "./ListSection";
import FooterSection from "./FooterSection";
import apiClient from "../../../pages/Login/apiClient";
import Cookies from "js-cookie";

const ChatSidebar = ({ userId, onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [searchedChats, setSearchedChats] = useState([]);
  const [chatData, setChatData] = useState([]);

  // 채팅방 조회
  useEffect(() => {
    const inquriyChatRooms = async () => {
      try {
        const token = Cookies.get("Authorization");
        const response = await apiClient.get(`/api/chatroom/user/chatrooms`);
        if (response.data) {
          setChatData(response.data.data);
        } else {
          console.error("올바르지 않은 데이터 형식:", response.data);
        }
      } catch (error) {
        console.error("채팅방 조회 중 에러 발생:", error);
      }
    };
    inquriyChatRooms();
  }, []);

  // 채팅방 검색
  const searchChatRooms = async () => {
    if (roomName.trim() === "") {
      setSearchedChats(chatData);
      return;
    }
    try {
      const response = await apiClient.get(`/api/chatroom/room/${roomName}`);
      const result = response.data;

      if (Array.isArray(result.data) && result.data.length > 0) {
        const searchedChats = result.data; // 조회된 채팅방
        const pastChats = chatData.filter(
          // 조회되지 않은 채팅방
          (chat) =>
            !searchedChats.some((searchedChat) => searchedChat.id === chat.id)
        );
        setSearchedChats([...searchedChats, ...pastChats]);
      } else {
        console.error("잘못된 데이터 형식:", result);
        setSearchedChats([]); // 오류 시 빈 배열 설정
      }
    } catch (error) {
      console.error("채팅방 검색 중 오류 발생:", error);
      setSearchedChats([]); // 오류 시 빈 결과 반환
    }
  };

  // 채팅방 생성
  const handleCreateRoom = async (roomName) => {
    try {
      const token = Cookies.get("Authorization");
      const response = await apiClient.post("/api/chatroom/create", {
        roomName: roomName,
      });

      if (response.data.success) {
        console.log("채팅방이 성공적으로 생성되었습니다!");
        const newChatRoom = response.data.newChatRoom;
        setChats((prevChats) => [...prevChats, newChatRoom]);
        searchedChats((prevChats) => [...prevChats, newChatRoom]);
      }
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      console.log("채팅방 생성에 실패했습니다.");
    }
  };

  // 채팅방 삭제
  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await apiClient.delete(`/api/chatroom/rooms/${roomId}`);
      if (response.status === 200) {
        console.log("채팅방이 삭제되었습니다.");
      }
    } catch (error) {
      console.error("삭제 에러");
    }
  };

  const handleSearchChange = (e) => {
    setRoomName(e.target.value);
    searchChatRooms();
  };

  const handleSelectChat = (chatId) => {
    onSelectChat(chatId);
    console.log("선택된 채팅방 Id: ", chatId);
  };
  const [searchValue, setSearchValue] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false); // 체크박스 표시 여부
  const [selectedChatIds, setSelectedChatIds] = useState([]); // 선택된 채팅방 ID
  const [selectedChatId, setSelectedChatId] = useState(null); // 선택된 채팅방 ID (MainChatComponent에 전달)

  const handleCheckboxClick = (chatId) => {
    setSelectedChatIds(
      (prev) =>
        prev.includes(chatId)
          ? prev.filter((id) => id !== chatId)
          : [...prev, chatId] // 선택 추가
    );
  };

  const handleRoomDeleteClick = () => {
    if (showCheckboxes && selectedChatIds.length > 0) {
      // 선택된 채팅방 삭제
      selectedChatIds.forEach((roomId) => handleDeleteRoom(roomId));
      setSelectedChatIds([]); // 선택 목록 초기화
    }
    setShowCheckboxes(!showCheckboxes); // 체크박스 표시/숨기기 전환
  };

  return (
    <Sidebar>
      <SearchSection
        roomName={roomName}
        handleSearchChange={handleSearchChange}
        searchChatRooms={searchChatRooms}
        searchValue={searchValue}
      />
      <ListSection
        chats={searchedChats.length > 0 ? searchedChats : chatData}
        handleSelectChat={handleSelectChat}
        handleCheckboxClick={handleCheckboxClick}
        selectedChatIds={selectedChatIds}
        showCheckboxes={showCheckboxes}
      />
      <FooterSection
        handleCreateRoom={handleCreateRoom}
        handleRoomDeleteClick={handleRoomDeleteClick}
        showCheckboxes={showCheckboxes}
      />
    </Sidebar>
  );
};

export default ChatSidebar;

const Sidebar = styled.aside`
  width: 310px;
  height: 700px;
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`;
