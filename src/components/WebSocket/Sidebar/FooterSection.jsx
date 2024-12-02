import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "./Modal";

const FooterSection = ({ handleCreateRoom }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCreateRoomClick = () => {
    setModalOpen(true);
  };
  const handleCreateRoomClose = () => {
    setModalOpen(false);
  };
  const handleRoomCreate = (roomName) => {
    handleCreateRoom(roomName); // ChatSidebar로 전달
    setModalOpen(false); // 모달 닫기
  };
  return (
    <FooterWrapper>
      <FooterBtnWrap>
        <RoomDeleteBtn>
          <RiDeleteBin6Line size={18} />
        </RoomDeleteBtn>
        <CreateButton onClick={handleCreateRoomClick}>
          채팅방 만들기
          <FaChevronRight size={14} />
        </CreateButton>
      </FooterBtnWrap>
      <Modal
        isOpen={modalOpen}
        onClose={handleCreateRoomClose}
        onCreate={handleRoomCreate}
      />
    </FooterWrapper>
  );
};

export default FooterSection;

// Styled Components for FooterSection

const FooterWrapper = styled.section`
  min-height: 49px;
  border: 1px solid #e6e6ea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px;
`;

const FooterBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CreateButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
  border-radius: 4px;

  &:hover {
    background-color: #67fc99;
  }
`;

const RoomDeleteBtn = styled.button`
  background-color: #ffffff;
  color: gray;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
  border-radius: 4px;

  &:hover {
    background-color: #f08a21;
  }
`;
