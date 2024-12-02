import React, { useState } from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, onCreate }) => {
  const [roomName, setRoomName] = useState("");

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = () => {
    if (roomName.trim()) {
      onCreate(roomName); // 채팅방 생성
      setRoomName(""); // 입력 필드 초기화
      onClose(); // 모달 닫기
    }
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <h2>채팅방 만들기</h2>
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="채팅방 이름을 입력하세요"
            value={roomName}
            onChange={handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <CancleButton onClick={onClose}>취소</CancleButton>
          <SubButton onClick={handleSubmit}>보내기</SubButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

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
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

const SubButton = styled.button`
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
