import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signUpActions } from "../../Store/slice/signUpSlice";
import { useSelector } from "react-redux";
import { passwordCheck } from "../../utils/passwordCheck";

const Inputs = styled.div`
  font-family: "Pretendard", sans-serif;
  display: inline-block;
  padding: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const TitleWrapper = styled.div`
  > h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    b {
      color: rgb(239, 68, 68);
      margin-left: 5px;
    }
  }
`;

const RealInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > input {
    width: 400px;
    padding: 12px 16px;
    outline: none;
    border: 1px solid rgb(229, 231, 235);
    background-color: rgb(249, 250, 251);
  }
  > button {
    width: 90px;
    background-color: rgb(191, 219, 254);
    color: rgb(29, 78, 216);
    border: none;
    padding: 10px 0;
    margin-left: 20px;
  }
`;

const Condition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 14px;
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
}) => {
  const dispatch = useDispatch();
  const originPasswd = useSelector((state) => state.signUp.passwd);

  const onChangeHandler = (e) => {
    switch (title) {
      case "아이디":
        dispatch(signUpActions.setEmail(e.target.value));
      case "비밀번호":
        dispatch(signUpActions.setPasswd(e.target.value));
      case "비밀번호 확인":
        const isConfirm = passwordCheck(originPasswd, e.target.value);
    }
  };

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
          onChange={onChangeHandler}
        />
        {isNested ? <button>중복확인</button> : null}
      </RealInput>
      <Condition>
        {conditionText}
        <span>0/{maxLength}</span>
      </Condition>
    </Inputs>
  );
};

export default MainInput;
