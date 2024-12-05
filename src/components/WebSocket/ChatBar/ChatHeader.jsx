import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa6";
import Sidebar from "./Sidebar";

const ChatHeader = ({ roomName, selectedChatId }) => {
  const [sideBarShow, setSideBarShow] = useState(false);
  const toggleSidebar = () => {
    setSideBarShow(!sideBarShow);
  };

  return (
    <>
      <Header>
        <HeaderTitle className="blind">채팅방 영역</HeaderTitle>
        <HeaderTop>
          <InfoArea>
            <NameArea>{roomName}</NameArea>
            <TextArea>
              <span className="message">....채팅방입니다....</span>
            </TextArea>
          </InfoArea>
          <HeaderMenu>
            <MenuButton onClick={toggleSidebar} aria-haspopup="true">
              <FaBars />
            </MenuButton>
          </HeaderMenu>
        </HeaderTop>
      </Header>
      <Sidebar
        isVisible={sideBarShow}
        toggleSidebar={toggleSidebar}
        selectedChatId={selectedChatId}
      />
    </>
  );
};

export default ChatHeader;

const Header = styled.header`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 55px;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const HeaderTitle = styled.h3`
  display: none;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const NameArea = styled.div`
  font-weight: bold;
  margin-right: 15px;
`;

const TextArea = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
`;

const HeaderMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: #333;
  }
`;
