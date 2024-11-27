import React, { useState, useEffect } from "react";
import KakaoLoginButton from "./KaKaoLoginButton";
import Cookies from "js-cookie";
import axios from "axios";
import LogoutButton from "./LogoutButton";

const Login = () => {
  //// 그냥 임시로 바로 회원가입요청 보내기

  function signUpUser() {
    const userData = {
      username: "aaaa1234@naver.com",
      password: "@a1234",
      nickname: "testUser",
      phone: "010-1234-1234",
      address: "우리주소",
      profileImg: "필수지만 일단 난 모르오",
    };

    fetch("http://localhost:8080/api/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 서버가 JSON 형식을 받는다면 이 헤더 필요
      },
      body: JSON.stringify(userData), // 객체를 JSON 문자열로 변환하여 전송
    })
      .then((response) => response.json()) // 응답을 JSON 형식으로 변환
      .then((data) => {
        console.log("회원가입 성공:", data);
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
      });
  }

  // 상태 변수로 username과 password 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("Username changed:", username);
  }, [username]); // username이 변경될 때마다 로그 출력

  useEffect(() => {
    console.log("Password changed:", password);
  }, [password]); // password가 변경될 때마다 로그 출력

  // 로그인 함수
  const requestLogin = async () => {
    console.log("요청할 때 들어가는 id", username, "비번", password);
    try {
      const data = await axios.post(
        `http://localhost:8080/api/user/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 인증 정보를 포함시키기 위해 'true' 설정
        }
      );
      // 응답 전체 확인
      console.log("서버 응답 전체:", data);

      const token = data.headers["authorization"]; // JWT 추출
      console.log("받아오는 토큰", token);

      if (token) {
        const jwtToken = token.split(" ")[1]; // "Bearer"를 제거하고 JWT만 추출
        console.log("우리가 잘받아서 뜯은 토큰은 ", jwtToken);
        Cookies.set("Authorization", jwtToken, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        }); // 쿠키에 저장
        /*
          path: '/': 이 쿠키는 모든 경로에서 접근 가능합니다.
          secure: true: 쿠키는 HTTPS 연결을 통해서만 전송됩니다.
          sameSite: 'Strict': 쿠키가 다른 사이트에서의 요청에 포함되지 않도록 설정합니다. 이는 CSRF 공격을 방지하는 데 도움이 됩니다.
          */
      }

      console.log("Login successful");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <div className="로그인 영역">
        <div className="볼메이트 로고 이미지">로고</div>
        <div className="입력할 것들 넣는 곳">
          <input
            type="text"
            placeholder="아이디"
            value={username} // 상태값을 input value에 연결
            onChange={(e) => setUsername(e.target.value)} // input 값 변경 시 상태 업데이트
          />
          <input
            type="password"
            placeholder="비번"
            value={password} // 상태값을 input value에 연결
            onChange={(e) => setPassword(e.target.value)} // input 값 변경 시 상태 업데이트
          />
        </div>
        <div>
          <button className="요청버튼" onClick={requestLogin}>
            로그인
          </button>
          <div className="로그인 상태 유지 관련 하던지 말던지">
            <div>체크가능한 박스</div>
            <div>로그인 상태 유지</div>
          </div>
        </div>
        <div className="기능들 관련">
          <div>아이디 찾기</div>
          <div>비밀번호 찾기</div>
          <div>회원가입</div>
        </div>
        <div className="외부인증영역">
          <KakaoLoginButton />
        </div>

        <button onClick={signUpUser}>임시 회원가입 버튼이에요</button>
        <LogoutButton />
      </div>
    </>
  );
};

export default Login;
