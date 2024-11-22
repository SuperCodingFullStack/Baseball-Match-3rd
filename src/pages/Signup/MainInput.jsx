import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signUpActions } from "../../Store/slice/signUpSlice";
import { signUpErrorActions } from "../../Store/slice/signUpErrorSlice";
import { useSelector } from "react-redux";
import { emailCheck } from "../../utils/emailCheck";
import ConfirmModal from "./ConfirmModal";

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
  }
`;

const TitleWrapper = styled.div`
  display: flex;
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
    font-size: 14px;
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
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const email = useSelector((state) => state.signUp.email);

  const onFocusHandler = () => {
    setIsTouched(true);
  };

  const onChangeHandler = (e) => {
    switch (title) {
      case "아이디":
        dispatch(signUpActions.setEmail(e.target.value));
    }
  };

  const isNestHandler = (e) => {
    e.preventDefault();
    setIsModal(true);
    document.getElementById("root").classList.add("dim");
  };

  useEffect(() => {
    if (email) {
      const emailResponse = emailCheck(email);
      if (emailResponse.error) {
        dispatch(signUpErrorActions.setEmailError(emailResponse.msg));
      }
    }
  }, [email]);

  return (
    <Inputs>
      <TitleWrapper>
        <h2>
          {title}
          {isRequired ? <b>*</b> : null}
        </h2>
      </TitleWrapper>
      <RealInput>
        <input
          type={types}
          placeholder={placeholder}
          onFocus={onFocusHandler}
          onChange={onChangeHandler}
        />
        {isModal &&
          ReactDOM.createPortal(
            <ConfirmModal
              isModal={isModal}
              setIsModal={setIsModal}
              isTouched={isTouched}
              type="id"
            />,
            document.getElementById("root")
          )}
      </RealInput>
      {isNested ? <button onClick={isNestHandler}>중복확인</button> : null}
      <Condition className={`${isReverse ? "reverse" : ""}`}>
        <p>{conditionText}</p>
        <span>0/{maxLength}</span>
      </Condition>
    </Inputs>
  );
};

export default MainInput;
