import axios from "axios";

export const emailCheck = async (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    const response = await axios.get(
      `http://localhost:8080/api/user/email?email=${email}`
    );
    const data = response.data;
  } catch (error) {
    console.error(error);
  }

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
