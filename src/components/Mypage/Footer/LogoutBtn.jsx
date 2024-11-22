import React from "react";
import styled from "styled-components";

const Logoutbtn = styled.button``;
const LogOutBtnContainer = styled.div`
  padding: 12px 16px 12px;
  color: #ffffff;
  text-decoration: underline;
`;

const LogoutBtn = () => {
  return (
    <LogOutBtnContainer>
      <Logoutbtn>
        <span>로그아웃</span>
      </Logoutbtn>
    </LogOutBtnContainer>
  );
};

export default LogoutBtn;
