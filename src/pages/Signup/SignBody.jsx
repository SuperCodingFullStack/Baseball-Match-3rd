import React from "react";
import styled from "styled-components";
import MainContent from "./MainContent";

const Body = styled.main`
  position: relative;
  left: 210px;
  padding-top: 25px;
  padding-left: 25px;
`;

const SignBody = () => {
  return (
    <Body>
      <MainContent />
    </Body>
  );
};

export default SignBody;
