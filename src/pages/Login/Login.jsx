import React, { useState, useEffect } from 'react';
import KakaoLoginButton from './KaKaoLoginButton';
import Cookies from 'js-cookie';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import styled from 'styled-components';
import LoginLogo from '../../assets/Login_logo.png';

const LoginWrapper = styled.div`
  height: 100vh;
  background-color: #515def;
`;

const LoginArea = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 100px;
  img {
    width: 30px;
  }
  span {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
`;

const IdAndPassword = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const IdorPw = styled.div`
  position: relative;
  font-family: 'Red Hat Display', sans-serif;
  input {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #79747e;
    padding: 13px;
    box-sizing: border-box;
    &::placeholder {
      font-size: 12px;
    }
  }
  label {
    position: absolute;
    bottom: 100%;
    transform: translateY(50%);
    left: 10px;
    display: inline-block;
    padding: 0 10px;
    background-color: #fff;
    font-size: 14px;
  }
`;

const RememberSearch = styled.div`
  width: 400px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Checkbox = styled.div`
  font-family: 'Red Hat Display', sans-serif;
  display: flex;
  align-items: center;
`;

const ForgotPassword = styled.button`
  background-color: transparent;
  border: none;
  color: #ff8682;
  font-size: 15px;
`;

const LoginButton = styled.button`
  width: 300px;
  background-color: #515def;
  color: #fff;
  font-size: 14px;
  &:disabled {
    opacity: 0.45;
  }
`;

const KakaoAuth = styled.div`
  margin-top: 30px;
  width: 300px;
  h2 {
    text-align: center;
    position: relative;
    background-color: #fff;
    z-index: 4;
    margin-bottom: 20px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 30%;
      height: 1px;
      background-color: #313131;
    }
    &::before {
      content: '';
      position: absolute;
      width: 30%;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      background-color: #313131;
  }
`;

const Login = () => {
  //// 그냥 임시로 바로 회원가입요청 보내기

  function signUpUser() {
    const userData = {
      username: 'aaaa1234@naver.com',
      password: '@a1234',
      nickname: 'testUser',
      phone: '010-1234-1234',
      address: '우리주소',
      profileImg: '필수지만 일단 난 모르오',
    };

    fetch('http://localhost:8080/api/user/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 서버가 JSON 형식을 받는다면 이 헤더 필요
      },
      body: JSON.stringify(userData), // 객체를 JSON 문자열로 변환하여 전송
    })
      .then((response) => response.json()) // 응답을 JSON 형식으로 변환
      .then((data) => {
        console.log('회원가입 성공:', data);
      })
      .catch((error) => {
        console.error('회원가입 실패:', error);
      });
  }

  // 상태 변수로 username과 password 관리
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const rememberUserName = Cookies.get('RememberId');
    if (rememberUserName) {
      setUsername(rememberUserName);
    }
  }, []);
  // 처음 마운트 됐을 때 실행

  useEffect(() => {
    console.log('Username changed:', username);
  }, [username]); // username이 변경될 때마다 로그 출력

  useEffect(() => {
    console.log('Password changed:', password);
  }, [password]); // password가 변경될 때마다 로그 출력

  // 체크박스의 체크 여부
  useEffect(() => {
    console.log('isChecked : ' + isChecked);
    if (isChecked) {
      if (username !== '') {
        Cookies.set('RememberId', username);
      }
    }
  }, [isChecked]);

  //

  // 로그인 함수
  const requestLogin = async () => {
    console.log('요청할 때 들어가는 id', username, '비번', password);
    try {
      const data = await axios.post(
        `http://localhost:8080/api/user/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 인증 정보를 포함시키기 위해 'true' 설정
        }
      );
      // 응답 전체 확인
      console.log('서버 응답 전체:', data);

      const token = data.headers['authorization']; // JWT 추출
      console.log('받아오는 토큰', token);

      if (token) {
        const jwtToken = token.split(' ')[1]; // "Bearer"를 제거하고 JWT만 추출
        console.log('우리가 잘받아서 뜯은 토큰은 ', jwtToken);
        Cookies.set('Authorization', jwtToken, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        }); // 쿠키에 저장
        /*
          path: '/': 이 쿠키는 모든 경로에서 접근 가능합니다.
          secure: true: 쿠키는 HTTPS 연결을 통해서만 전송됩니다.
          sameSite: 'Strict': 쿠키가 다른 사이트에서의 요청에 포함되지 않도록 설정합니다. 이는 CSRF 공격을 방지하는 데 도움이 됩니다.
          */
      }

      console.log('Login successful');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <LoginWrapper>
      <LoginArea>
        <Logo>
          <img src={LoginLogo} alt="login_logo" />
          <span>Baseball Mate</span>
        </Logo>
        <IdAndPassword>
          <IdorPw>
            <label for="uid">email</label>
            <input
              type="text"
              placeholder="Write Your Email"
              id="uid"
              value={username} // 상태값을 input value에 연결
              onChange={(e) => setUsername(e.target.value)} // input 값 변경 시 상태 업데이트
            />
          </IdorPw>
          <IdorPw>
            <label for="upw">password</label>
            <input
              type="password"
              placeholder="Write Your Password"
              id="upw"
              value={password} // 상태값을 input value에 연결
              onChange={(e) => setPassword(e.target.value)} // input 값 변경 시 상태 업데이트
            />
          </IdorPw>
        </IdAndPassword>
        <RememberSearch>
          <Checkbox>
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={() => {
                setIsChecked((prev) => !prev);
              }}
            />
            <label for="checkbox">remember me</label>
          </Checkbox>
          <ForgotPassword>Forgot Password ?</ForgotPassword>
        </RememberSearch>
        <LoginButton onClick={requestLogin} disabled={!(username && password)}>
          Login
        </LoginButton>
        <KakaoAuth>
          <h2>Social Login</h2>
          <KakaoLoginButton />
        </KakaoAuth>
      </LoginArea>
    </LoginWrapper>
  );
};

export default Login;
