import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchSection from "./SearchSection";
import ListSection from "./ListSection";
import FooterSection from "./FooterSection";
import apiClient from "../../../pages/Login/apiClient";
import Cookies from "js-cookie";

const ChatSidebar = ({ userId }) => {
  const [chats, setChats] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [searchedChats, setSearchedChats] = useState([]);
  const [selectedChats, setSelectedChats] = useState(null);
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
      setSearchedChats(chats); // 검색어가 없으면 원래 목록 반환
      return;
    }
    try {
      const response = await apiClient.get(`/api/chatroom/room/${roomName}`);
      if (Array.isArray(response.data)) {
        setSearchedChats(response.data); // 배열이면 검색 결과 상태 업데이트
      } else {
        console.error("잘못된 데이터 형식:", response.data);
        setSearchedChats([]); // 오류 시 빈 배열 설정
      }
    } catch (error) {
      console.error("채팅방 검색 중 오류 발생:", error);
      setSearchedChats([]); // 오류 시 빈 결과 반환
    }
  };

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

  const handleSearchChange = (e) => {
    setRoomName(e.target.value);
    searchChatRooms();
  };

  const handleSearchDelete = () => {
    setRoomName("");
  };

  const handleSelectChat = (chatId) => {
    setSearchedChats(chatId);
  };
  const [searchValue, setSearchValue] = useState("");

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
        selectedChats={selectedChats}
        handleSelectChat={handleSelectChat}
      />
      <FooterSection handleCreateRoom={handleCreateRoom} />
    </Sidebar>
  );
};

export default ChatSidebar;

const Sidebar = styled.aside`
  width: 310px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`;
