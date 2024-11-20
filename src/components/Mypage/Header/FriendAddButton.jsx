import React from "react";
import styled from "styled-components";

const AddButton = styled.button`
  background-color: #40cf66;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33a956;
  }
`;

const FriendAddButton = () => {
  return <AddButton>친구 추가</AddButton>;
};

export default FriendAddButton;
