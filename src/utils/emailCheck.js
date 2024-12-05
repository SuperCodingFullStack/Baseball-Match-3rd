export const emailCheck = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(email)) {
    return {
      error: false,
      msg: "올바른 이메일입니다.",
    };
  }
  if (!email) {
    return {
      error: true,
      msg: "이메일을 입력해주세요.",
    };
  }
  return {
    error: true,
    msg: "형식에 맞지 않는 이메일입니다.",
  };
};
