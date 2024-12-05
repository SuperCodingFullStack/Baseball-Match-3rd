import React, { useState } from "react";
import styled from "styled-components";

const DeleteModal = ({ isOpen, onClose, seletedChat, handleDeleteChats }) => {
  if (!isOpen) return null;

  const handleDelte = () => {
    handleDeleteChats(seletedChat.id);
    onClose();
  };
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <h2>채팅방 삭제</h2>
        </ModalHeader>
        <ModalBody>
          <p>해당 채팅방을 삭제하시겠습니까?</p>
          <ul>
            {seletedChat.map((chat) => (
              <li>{chat.roomName}</li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <CancleButton onClick={onClose}>취소</CancleButton>
          <DeleteButton onClick={handleDelte}>삭제</DeleteButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancleButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #67fc99;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #67fc99;
  }
`;
