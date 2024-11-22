import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUpActions } from "../../Store/slice/signUpSlice";
import { signUpNestActions } from "../../Store/slice/signUpNestSlice";

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

const ConfirmModal = ({ type, isModal, setIsModal, isTouched }) => {
  const message = useSelector((state) => state.signUpError.email.errorMsg);
  const isError = useSelector((state) => state.signUpError.email.isError);
  const dispatch = useDispatch();

  const onOk = () => {
    setIsModal(false);
    document.getElementById("root").classList.remove("dim");
    dispatch(signUpNestActions.setEmailNest());
  };

  const onClose = () => {
    setIsModal(false);
    document.getElementById("root").classList.remove("dim");
    dispatch(signUpActions.setEmail(""));
  };

  const onJustClose = () => {
    setIsModal(false);
    document.getElementById("root").classList.remove("dim");
  };

  return (
    <Modals>
      <ModalMessage>
        <ModalIcon>
          <FaCheckCircle />
        </ModalIcon>
        <ModalMsgs>
          <p>{message}</p>
          <strong>
            {isError | !isTouched
              ? "돌아가서 다시 아이디를 입력해주세요."
              : "이것으로 선택하시겠습니까?"}
          </strong>
        </ModalMsgs>
      </ModalMessage>
      <ModalButtons>
        {!isError && isTouched ? (
          <>
            <button onClick={onClose}>아니오, 취소합니다.</button>
            <button onClick={onOk}>예, 선택할래요.</button>
          </>
        ) : (
          <button onClick={onJustClose}>닫기</button>
        )}
      </ModalButtons>
    </Modals>
  );
};

export default ConfirmModal;
