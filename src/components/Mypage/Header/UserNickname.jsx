import React from "react";
import styled from "styled-components";

const Nickname = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const UserNickname = ({ name }) => {
  return <Nickname>{name}</Nickname>;
};

export default UserNickname;
