import React from "react";
import styled from "styled-components";

const Inputs = styled.div`
  font-family: "Pretendard", sans-serif;
  display: inline-block;
  padding: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
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

const MainInput = () => {
  return (
    <Inputs>
      <h2>
        아이디<b>*</b>
      </h2>
      <RealInput>
        <input type="text" placeholder="아이디를 입력해주세요." />
        <button>중복확인</button>
      </RealInput>
      <Condition>
        <p>한글,영문,특수문자 사용 가능</p>
        <span>0/50</span>
      </Condition>
    </Inputs>
  );
};

export default MainInput;
