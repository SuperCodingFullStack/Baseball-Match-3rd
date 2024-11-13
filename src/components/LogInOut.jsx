import React, { useEffect, useState } from "react";

function AuthComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken"); // localStorage에서 토큰 가져오기
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
    }
  };

  // 컴포넌트가 마운트될 때 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("authToken"); // 토큰 제거
    setIsLoggedIn(false); // 로그아웃 상태로 설정
    alert("로그아웃되었습니다.");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>로그인 상태입니다.</p>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <p>로그아웃 상태입니다.</p>
      )}
    </div>
  );
}

export default AuthComponent;
