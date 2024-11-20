import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
`;

const SettingsButton = () => {
  return <Button>⚙️</Button>; // Use an icon from your library for a professional look
};

export default SettingsButton;
