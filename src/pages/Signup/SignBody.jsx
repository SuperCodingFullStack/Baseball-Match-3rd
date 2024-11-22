import React, { forwardRef } from "react";
import styled from "styled-components";
import MainContent from "./MainContent";

const Body = styled.div`
  padding-left: 25px;
  padding-top: 25px;
`;

const SignBody = forwardRef((props, ref) => {
  return (
    <Body ref={ref} {...props}>
      <MainContent />
    </Body>
  );
});

export default SignBody;
