export const addressCheck = (address) => {
  if (address) {
    return {
      error: false,
      msg: "올바른 주소 입니다.",
    };
  }
  return {
    error: true,
    msg: "올바르지 않은 주소입니다.",
  };
};
