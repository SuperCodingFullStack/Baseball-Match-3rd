import React from 'react';

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL =
    'https://kauth.kakao.com/oauth/authorize?client_id=cf2780911e4f8eb3eaf1a372d6f9df9d&redirect_uri=http://localhost:8080/api/user/kakao/callback&response_type=code';

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={handleLogin} style={styles.button}>
      카카오로 로그인하기
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#fee500', // 카카오 노란색
    color: '#000',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default KakaoLoginButton;
