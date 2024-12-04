import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Modals = styled.div`
  padding: 40px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const ModalMessage = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const ModalIcon = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  margin-right: 20px;
`;

const ModalMsgs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 16px;
  }
  strong {
    font-size: 12px;
    color: rgba(84, 89, 94, 0.65);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  button {
    width: 200px;
    &:first-child {
      background-color: #fff;
      border: 1px solid #4f4f4f;
      font-size: 12px;
      font-weight: 400;
    }
    &:nth-child(2) {
      background-color: #4f4f4f;
      color: #fff;
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

const ConfirmModal = ({ title }) => {
  const dispatch = useDispatch();

  return (
    <Modals>
      <ModalMessage>
        <ModalIcon>
          <FaCheckCircle />
        </ModalIcon>
        <ModalMsgs>
          <p></p>
          <strong></strong>
        </ModalMsgs>
      </ModalMessage>
      <ModalButtons></ModalButtons>
    </Modals>
  );
};

export default ConfirmModal;
