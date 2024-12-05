import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "./ProfileInput";
import { favTeamList } from "./favTeamList";

const FavTeamWrapper = styled.div`
  max-width: 550px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 50px;
`;

const InputWrapper = styled.div`
  margin-top: 40px;
  grid-column: 1 / 5;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;
const RealInput = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  input {
    padding: 0;
    margin: 0;
  }
  label {
    margin-top: 3px;
  }
`;

const FavTeam = () => {
  const [radioChecked, setRadioChecked] = useState(null);

  const checkedHandler = (value) => {
    setRadioChecked(value);
  };

  return (
    <FavTeamWrapper>
      <Title>
        <h2>
          좋아하는 팀 선택하기<b>*</b>
        </h2>
      </Title>
      <InputWrapper>
        {favTeamList.map((ftl) => (
          <RealInput key={ftl.value}>
            <input
              type="radio"
              id={ftl.label}
              name={ftl.label}
              checked={radioChecked === ftl.value}
              onChange={() => {
                checkedHandler(ftl.value);
              }}
            />
            <label htmlFor={ftl.label}>{ftl.value}</label>
          </RealInput>
        ))}
      </InputWrapper>
    </FavTeamWrapper>
  );
};

export default FavTeam;
