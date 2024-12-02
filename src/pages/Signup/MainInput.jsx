import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ConfirmModal from "./ConfirmModal";
import { useDispatch } from "react-redux";
import { isModalActions } from "../../Store/slice/isModalSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { isNestActions } from "../../Store/slice/isNestSlice";

const Inputs = styled.div`
  font-family: "Pretendard", sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  max-width: 550px;
  > button {
    width: 90px;
    background-color: rgb(191, 219, 254);
    color: rgb(29, 78, 216);
    border: none;
    padding: 10px 0;
    margin-left: 20px;
    font-size: 14px;
    font-weight: 400;
    grid-column: 4 / 5;
    &:disabled {
      background-color: rgb(209, 213, 219);
      color: #fff;
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  > h2 {
    font-size: 18px;
    font-weight: 600;
    b {
      color: rgb(239, 68, 68);
      margin-left: 5px;
    }
  }
  > p {
    margin-left: 40px;
    font-size: 12px;
    &.error {
      color: rgb(239, 68, 68);
    }
    &.ok {
      color: blue;
    }
  }
`;

const RealInput = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  > input {
    width: 400px;
    padding: 12px 16px;
    outline: none;
    border: 1px solid rgb(229, 231, 235);
    background-color: rgb(249, 250, 251);
    &.error {
      border: 1px solid rgb(239, 68, 68);
    }
    &.selected {
      border: 1px solid #1d4ed8;
    }
  }
`;

const Condition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.reverse {
    flex-direction: row-reverse;
  }
  grid-column: 1 / 4;
  p {
    font-size: 13px;
  }
  span {
    font-size: 14px;
  }
`;

const MainInput = ({
  title,
  isRequired,
  types,
  placeholder,
  isNested,
  conditionText,
  maxLength,
  isReverse,
  onChangeHandler,
  valueData,
  errorMsg,
  isError,
  isTouched,
  setIsTouched,
  Nest,
}) => {
  const dispatch = useDispatch();

  const emailModal = useSelector((state) => state.isModal.emailModal);
  const nicknameModal = useSelector((state) => state.isModal.nicknameModal);
  const emailNest = useSelector((state) => state.isNest.emailNest);
  const nicknameNest = useSelector((state) => state.isNest.nicknameNest);

  const nestHandler = async (e) => {
    e.preventDefault();

    if (title === "아이디") {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/username?username=${valueData}`
        );
        const { data } = response;
        dispatch(
          isNestActions.setEmailNestMessage({
            error: data.status !== "success",
            message: data.data,
          })
        );
      } catch (err) {
        dispatch(
          isNestActions.setEmailNestMessage({
            error: true,
            message: "데이터 받아오기에 실패했습니다.",
          })
        );
      }

      document.getElementById("root").classList.add("dim");
      dispatch(isModalActions.setEmailModal());
    }
    if (title === "닉네임") {
      document.getElementById("root").classList.add("dim");
      dispatch(isModalActions.setNicknameModal());
    }
  };

  return (
    <Inputs>
      <TitleWrapper>
        <h2>
          {title}
          {isRequired ? <b>*</b> : null}
        </h2>
        {isTouched && (
          <p className={`${isError ? "error" : "ok"}`}>{errorMsg}</p>
        )}
      </TitleWrapper>
      <RealInput>
        <input
          type={types}
          placeholder={placeholder}
          onChange={(e) => {
            onChangeHandler(e.target.value, maxLength);
          }}
          onFocus={() => {
            setIsTouched(true);
          }}
          value={valueData}
        />
      </RealInput>
      {isNested ? (
        <button
          onClick={nestHandler}
          disabled={
            isError ||
            (!isTouched && !valueData) ||
            valueData.trim() === "" ||
            emailNest ||
            nicknameNest
          }
        >
          {Nest}
        </button>
      ) : null}
      {isNested &&
        (emailModal || nicknameModal) &&
        ReactDOM.createPortal(
          <ConfirmModal title={title} />,
          document.getElementById("root")
        )}
      <Condition className={`${isReverse ? "reverse" : ""}`}>
        <p>{conditionText}</p>
        <span>
          {isTouched ? valueData.length : 0} / {maxLength}
        </span>
      </Condition>
    </Inputs>
  );
};

export default MainInput;
