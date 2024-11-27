export const passwdCheck = (passwd) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (regex.test(passwd)) {
    return {
      isError: false,
      msg: "올바른 비밀번호입니다.",
    };
  }
  if (passwd.trim() === "") {
    return {
      isError: true,
      msg: "비밀번호는 공백일 수 없습니다.",
    };
  }
  return {
    isError: true,
    msg: "올바른 형식의 비밀번호가 아닙니다.",
  };
};
