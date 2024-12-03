import axios from "axios";

export const nicknameCheck = (nickname) => {
  const regex = /^[a-zA-Z0-9가-힣_-]{2,20}$/;

  if (regex.test(nickname)) {
    return {
      error: false,
      msg: "올바른 형식의 닉네임입니다.",
    };
  }
  if (!nickname) {
    return {
      error: true,
      msg: "닉네임을 입력해주세요.",
    };
  }
  return {
    error: true,
    msg: "올바르지 않은 형식의 이메일입니다.",
  };
};
