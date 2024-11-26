import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
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

const AddInput = styled.div`
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
  validate,
  isTouched,
  setIsTouched,
  isAdd,
  placeholder2,
  Nest,
  Nest2,
}) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <Inputs>
      <TitleWrapper>
        <h2>
          {title}
          {isRequired ? <b>*</b> : null}
        </h2>
        {!isNested && isTouched && (
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
          onClick={(e) => {
            e.preventDefault();
            validate();
            setIsModal(true);
            document.getElementById("root").classList.add("dim");
          }}
          disabled={(!isTouched && !valueData) || valueData.trim() === ""}
        >
          {Nest}
        </button>
      ) : null}
      {isNested &&
        isModal &&
        ReactDOM.createPortal(
          <ConfirmModal
            isTouched={isTouched}
            errorMsg={errorMsg}
            isError={isError}
            setModal={setIsModal}
          />,
          document.getElementById("root")
        )}
      {isAdd && (
        <>
          <AddInput>
            <input type={types} placeholder={placeholder2} />
          </AddInput>
          <button>{Nest2}</button>
        </>
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
