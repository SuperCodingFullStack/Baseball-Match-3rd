export const phoneCheck = (phone) => {
  const regex = /^010[-\s]?[0-9]{4}[-\s]?[0-9]{4}$/;

  if (regex.test(phone.trim())) {
    return {
      error: false,
      msg: null,
    };
  }
  return {
    error: true,
    msg: "올바른 형태의 전화번호 형식이 아닙니다.",
  };
};
