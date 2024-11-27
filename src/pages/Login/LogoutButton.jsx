import React from "react";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const logout = () => {
    Cookies.remove("Authorization"); // 쿠키 삭제
    window.location.href = "/login"; // 로그인 페이지로 리다이렉트
  };

  return <button onClick={logout}>로그아웃</button>;
};

export default LogoutButton;
