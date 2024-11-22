export const emailCheck = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(email)) {
    return {
      error: false,
      msg: "올바른 아이디입니다.",
    };
  }
  return {
    error: true,
    msg: "올바르지 않은 이메일입니다.",
  };
};
