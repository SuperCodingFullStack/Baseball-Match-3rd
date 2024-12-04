import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
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
  }
`;

const RealInputs2 = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1 / 4;
  grid-row: 3 / 4;
  > input {
    width: 400px;
    padding: 12px 16px;
    outline: none;
    border: 1px solid rgb(229, 231, 235);
    background-color: rgb(249, 250, 251);
    &:disabled {
      opacity: 0.45;
    }
    &.error {
      border: 1px solid rgb(239, 68, 68);
    }
    &.selected {
      border: 1px solid #1d4ed8;
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
  isTouched,
  setIsTouched,
}) => {
  const onFocusHandler = () => {
    setIsTouched(true);
  };

  const dispatch = useDispatch();

  const firstNestHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Inputing>
      <Titler>
        <h2>
          {title}
          <b>*</b>
        </h2>
      </Titler>
      <RealInputs>
        <input
          type="text"
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
          value={valueData}
          onFocus={onFocusHandler}
        />
      </RealInputs>
      <button onClick={firstNestHandler} disabled={!isTouched}>
        {firstNest}
      </button>
      <RealInputs2>
        <input type="text" disabled />
      </RealInputs2>
      <button disabled>{secondNest}</button>
    </Inputing>
  );
};

export default PhoneAndAddressInput;
