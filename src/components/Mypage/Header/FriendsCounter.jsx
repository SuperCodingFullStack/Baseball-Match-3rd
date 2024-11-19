import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
`;

const FriendCounter = ({ count }) => {
  return <Button>Friends: {count}</Button>;
};

export default FriendCounter;
