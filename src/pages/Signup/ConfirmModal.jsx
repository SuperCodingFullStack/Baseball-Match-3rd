import React, { useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { isNestActions } from "../../Store/slice/isNestSlice";

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

const ConfirmModal = ({
  title,
  setIsModal,
  modalMessage,
  setModalMessage,
  modalError,
  setModalError,
}) => {
  const dispatch = useDispatch();

  const onBack = () => {
    if (title === "아이디") {
      setIsModal(false);
      document.getElementById("root").classList.remove("dim");
      setModalMessage("");
      setModalError(false);
      dispatch(isNestActions.setEmailNestFalse());
    }
    if (title === "닉네임") {
      setIsModal(false);
      document.getElementById("root").classList.remove("dim");
      setModalMessage("");
      setModalError(false);
      dispatch(isNestActions.setNicknameNestFalse());
    }
  };

  const onSelect = () => {
    if (title === "아이디") {
      setIsModal(false);
      document.getElementById("root").classList.remove("dim");
      setModalMessage("");
      setModalError(false);
      dispatch(isNestActions.setEmailNestTrue());
    }
    if (title === "닉네임") {
      setIsModal(false);
      document.getElementById("root").classList.remove("dim");
      setModalMessage("");
      setModalError(false);
      dispatch(isNestActions.setNicknameNestTrue());
    }
  };

  return (
    <Modals>
      <ModalMessage>
        <ModalIcon>
          <FaCheckCircle />
        </ModalIcon>
        <ModalMsgs>
          <p>{modalMessage}</p>
          <strong>
            {modalError
              ? "다음에 다시 선택하세요."
              : "이걸로 선택하시겠습니까?"}
          </strong>
        </ModalMsgs>
      </ModalMessage>
      <ModalButtons>
        {modalError ? (
          <button onClick={onBack}>돌아가기</button>
        ) : (
          <>
            <button onClick={onBack}>취소합니다.</button>
            <button onClick={onSelect}>이걸로 선택합니다.</button>
          </>
        )}
      </ModalButtons>
    </Modals>
  );
};

export default ConfirmModal;
