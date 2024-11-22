import React from "react";
import styled from "styled-components";

const PhoneInputs = styled.div`
  font-family: "Pretendard", sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  max-width: 550px;
  > h2 {
    font-size: 18px;
    font-weight: 600;
    grid-column: 1 / 5;
    b {
      color: rgb(239, 68, 68);
      margin-left: 5px;
    }
  }
`;

const PhoneNumber = styled.div`
  display: flex;
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
    font-size: 14px;
    font-weight: 400;
  }
`;

const Auth = styled.div`
  display: flex;
  grid-column: 1 / 4;
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
    font-size: 14px;
    font-weight: 400;
  }
`;

const PhoneInput = () => {
  return (
    <PhoneInputs>
      <h2>
        핸드폰 인증<b>*</b>
      </h2>
      <PhoneNumber>
        <input type="number" placeholder="핸드폰 번호를 입력하세요." />
        <button>중복확인</button>
      </PhoneNumber>
      <Auth>
        <input type="number" placeholder="핸드폰 번호를 입력하세요." />
        <button>인증받기</button>
      </Auth>
    </PhoneInputs>
  );
};

export default PhoneInput;
