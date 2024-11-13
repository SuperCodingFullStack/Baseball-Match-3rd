const login = async () => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "yourUsername",
        password: "yourPassword",
      }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("authToken", data.token); // 토큰 저장
      setIsLoggedIn(true); // 로그인 상태로 설정
      alert("로그인 성공!");
    } else {
      alert("로그인 실패. 다시 시도해 주세요.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("오류가 발생했습니다. 다시 시도해 주세요.");
  }
};
