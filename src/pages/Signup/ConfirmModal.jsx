import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { isNestActions } from '../../Store/slice/isNestSlice';
import { isModalActions } from '../../Store/slice/isModalSlice';

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

const ConfirmModal = ({ errorMsg, isError, title }) => {
  const dispatch = useDispatch();

  const onCancel = () => {
    if (title === '아이디') {
      dispatch(isModalActions.setEmailModalFalse());
      document.getElementById('root').classList.remove('dim');
    }
    if (title === '닉네임') {
      dispatch(isModalActions.setNicknameModalFalse());
      document.getElementById('root').classList.remove('dim');
    }
  };

  const onSelect = () => {
    if (title === '아이디') {
      dispatch(isModalActions.setEmailModalFalse());
      document.getElementById('root').classList.remove('dim');
      dispatch(isNestActions.setEmailNest());
    }
    if (title === '닉네임') {
      dispatch(isModalActions.setNicknameModalFalse());
      document.getElementById('root').classList.remove('dim');
      dispatch(isNestActions.setNicknameNest());
    }
  };

  const onClose = () => {
    if (title === '아이디') {
      dispatch(isModalActions.setEmailModalFalse());
      document.getElementById('root').classList.remove('dim');
    }
    if (title === '닉네임') {
      dispatch(isModalActions.setNicknameModalFalse());
      document.getElementById('root').classList.remove('dim');
    }
  };

  return (
    <Modals>
      <ModalMessage>
        <ModalIcon>
          <FaCheckCircle />
        </ModalIcon>
        <ModalMsgs>
          <p>{errorMsg || 'Loading'}</p>
          <strong>
            {isError ? '다시 돌아가 선택하세요.' : '이것으로 고르실 건가요?'}
          </strong>
        </ModalMsgs>
      </ModalMessage>
      <ModalButtons>
        {!isError ? (
          <>
            <button onClick={onCancel}>아니오, 취소합니다.</button>
            <button onClick={onSelect}>예, 선택할래요.</button>
          </>
        ) : (
          <button onClick={onClose}>닫기</button>
        )}
      </ModalButtons>
    </Modals>
  );
};

export default ConfirmModal;
