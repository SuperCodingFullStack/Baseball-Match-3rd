import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
  background-color: #40cf66;
  color: #fff;
  border: none;
  border-radius: 5px;
  z-index: 10;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33a956;
  }
`;

const NavigationButton = ({ label, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return <StyledButton onClick={handleClick}>{label}</StyledButton>;
};

export default NavigationButton;
