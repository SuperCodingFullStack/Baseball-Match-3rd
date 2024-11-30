import React from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const Buttons = styled.button`
  width: 100%;
`;

const LogoutButton = () => {
  const logout = () => {
    Cookies.remove('Authorization'); // 쿠키 삭제
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
  };

  return <Buttons onClick={logout}>로그아웃</Buttons>;
};

export default LogoutButton;
