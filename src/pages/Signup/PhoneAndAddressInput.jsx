import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { isNestActions } from "../../Store/slice/isNestSlice";
import axios from "axios";
import DaumPostcodeEmbed from "react-daum-postcode";

const Inputing = styled.div`
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
const Titler = styled.div`
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
    font-size: 12px;
    margin-left: 20px;
    &.error {
      color: rgb(239, 68, 68);
    }
    &.ok {
      color: blue;
    }
  }
`;

const RealInputs = styled.div`
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
    &:disabled {
      opacity: 0.45;
    }
  }
`;

const PhoneAndAddressInput = ({
  title,
  firstNest,
  secondNest,
  valueData,
  onChangeHandler,
  isError,
  errorMsg,
  isTouched,
  setIsTouched,
}) => {
  const [phoneDisable, setPhoneDisable] = useState(false);
  const [isAddressModal, setIsAddressModal] = useState(false);

  const isPhoneAuth = useSelector((state) => state.isNest.isPhoneAuth);

  const onFocusHandler = () => {
    setIsTouched(true);
  };

  const dispatch = useDispatch();

  const firstNestHandler = (e) => {
    e.preventDefault();

    if (title === "핸드폰 인증") {
      dispatch(isNestActions.setPhoneAuthTrue());
    }
    if (title === "주소 인증") {
      setIsAddressModal(true);
      document.getElementById("root").classList.add("dim");
    }
  };

  const completeHandler = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname) {
        extraAddress += data.bname;
      }
    }
    if (data.buildingName) {
      extraAddress += extraAddress
        ? `, ${data.buildingName}`
        : data.buildingName;
    }
    fullAddress += extraAddress ? ` ${extraAddress}` : "";

    onChangeHandler(fullAddress);
    document.getElementById("root").classList.remove("dim");
  };

  useEffect(() => {
    if (title === "핸드폰 인증") {
      if (!isTouched || !valueData || isError) {
        setPhoneDisable(true);
      } else {
        setPhoneDisable(false);
      }
      if (isPhoneAuth) {
        setPhoneDisable(true);
      }
    }
    if (title === "주소 인증") {
    }
  }, [isPhoneAuth, isError]);

  return (
    <Inputing>
      <Titler>
        <h2>
          {title}
          <b>*</b>
        </h2>
        <p className={`${isError ? "error" : "ok"}`}>{errorMsg}</p>
      </Titler>
      <RealInputs>
        <input
          type="text"
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
          value={valueData}
          onFocus={onFocusHandler}
          disabled={title === "주소 인증" || isPhoneAuth}
        />
      </RealInputs>
      <button
        onClick={firstNestHandler}
        disabled={title === "핸드폰 인증" && phoneDisable}
      >
        {title === "핸드폰 인증" && isPhoneAuth ? secondNest : firstNest}
      </button>
      {title === "주소 인증" && isAddressModal && (
        <DaumPostcodeEmbed
          onComplete={completeHandler}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%)`,
            zIndex: "10",
            width: "50%",
          }}
        />
      )}
    </Inputing>
  );
};

export default PhoneAndAddressInput;
