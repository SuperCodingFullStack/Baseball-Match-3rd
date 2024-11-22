import React from "react";
import styled from "styled-components";

const Logoutbtn = styled.button``;
const LogOutBtnContainer = styled.div`
  padding: 12px 16px 12px;
  color: #ffffff;
  text-decoration: underline;
`;
const handleLogout = () => {
  // localStorage에서 토큰 제거
  localStorage.removeItem("jwtToken");

  // sessionStorage에서 토큰 제거 (필요 시)
  sessionStorage.removeItem("jwtToken");

  // 로그아웃 후 리디렉션
  window.location.href = "/login";
};

const LogoutBtn = () => {
  return (
    <LogOutBtnContainer>
      <Logoutbtn onClick={handleLogout}>
        <span>로그아웃</span>
      </Logoutbtn>
    </LogOutBtnContainer>
  );
};

export default LogoutBtn;
