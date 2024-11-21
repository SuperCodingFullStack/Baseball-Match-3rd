import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
`;

const FriendsListButton = () => {
  return <Button>👥</Button>; // Replace with an appropriate friends list icon
};

export default FriendsListButton;
