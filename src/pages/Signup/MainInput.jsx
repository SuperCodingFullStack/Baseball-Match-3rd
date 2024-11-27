import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signUpActions } from "../../Store/slice/signUpSlice";
import { signUpErrorActions } from "../../Store/slice/signUpErrorSlice";
import { useSelector } from "react-redux";
import { emailCheck } from "../../utils/emailCheck";
import ConfirmModal from "./ConfirmModal";
import { passwdCheck } from "../../utils/passwdCheck";
import { passwordCheck } from "../../utils/passwordCheck";

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
  const passwd = useSelector((state) => state.signUp.passwd);
  const passwdError = useSelector((state) => state.signUpError.password);
  const passwdConfirm = useSelector((state) => state.signUp.passwdConfirm);

  const onFocusHandler = () => {
    setIsTouched(true);
  };

  const onChangeHandler = (e) => {
    switch (title) {
      case "아이디":
        dispatch(signUpActions.setEmail(e.target.value));
        if (e.target.value.length > maxLength) {
          dispatch(signUpActions.setEmail(e.target.value.slice(0, maxLength)));
        }
        break;
      case "비밀번호":
        dispatch(signUpActions.setPasswd(e.target.value));
        if (e.target.value.length > maxLength) {
          dispatch(signUpActions.setPasswd(e.target.value.slice(0, maxLength)));
        }
      case "비밀번호 확인":
        dispatch(signUpActions.setPasswdConfirm(e.target.value));
        if (e.target.value.length > maxLength) {
          dispatch(
            signUpActions.setPasswdConfirm(e.target.value.slice(0, maxLength))
          );
        }
      case "이름":
        dispatch(signUpActions.setUserName(e.target.value));
    }
  };

  const isNestHandler = (e) => {
    e.preventDefault();
    setIsModal(true);
    document.getElementById("root").classList.add("dim");
  };

  useEffect(() => {
    if (email && title === "아이디") {
      const emailResponse = emailCheck(email);
      if (emailResponse.error) {
        dispatch(signUpErrorActions.setEmailError(emailResponse.msg));
      } else {
        dispatch(signUpErrorActions.setEmailOk(emailResponse.msg));
      }
    }
    if (passwd && title === "비밀번호") {
      const passwdResponse = passwdCheck(passwd);
      if (passwdResponse.isError) {
        dispatch(signUpErrorActions.setPasswordError(passwdResponse.msg));
      } else {
        dispatch(signUpErrorActions.setPasswordOk(passwdResponse.msg));
      }
    }
    if (passwdConfirm && title === "비밀번호 확인") {
      const passwdConfirmResponse = passwordCheck(passwd, passwdConfirm);
      if (passwdConfirmResponse) {
        dispatch(
          signUpErrorActions.setPasswordConfirmError(
            "비밀번호가 일치하지 않습니다."
          )
        );
      }
    }
  }, [email, passwd, passwdConfirm]);

  return (
    <Inputs>
      <TitleWrapper>
        <h2>
          {title}
          {isRequired ? <b>*</b> : null}
        </h2>
        {title === "비밀번호" && isTouched && (
          <p className={`${passwdError.isError ? "error" : "ok"}`}>
            {passwdError.errorMsg}
          </p>
        )}
      </TitleWrapper>
      <RealInput>
        <input
          type={types}
          placeholder={placeholder}
          onFocus={onFocusHandler}
          onChange={onChangeHandler}
          className={`${
            title === "비밀번호" && passwdError.isError && "error"
          }`}
          value={
            (title === "아이디" && isTouched ? email : "") ||
            (title === "비밀번호" && isTouched ? passwd : "")
          }
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
      {isNested ? (
        <button
          onClick={isNestHandler}
          disabled={!isTouched || email.trim() == ""}
        >
          중복확인
        </button>
      ) : null}
      <Condition className={`${isReverse ? "reverse" : ""}`}>
        <p>{conditionText}</p>
        <span>
          {(title === "아이디" && isTouched ? email.length : "0") ||
            (title === "아이디" && isTouched && !email && "0") ||
            (title === "비밀번호" && passwd.length)}
          /{maxLength}
        </span>
      </Condition>
    </Inputs>
  );
};

export default MainInput;
