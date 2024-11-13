import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  width: 1336px;
`;

const Mypage = () => {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

export default Mypage;
