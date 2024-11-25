import axios from "axios";

export const emailCheck = async (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    if (email) {
      const response = await axios.get(
        `http://localhost:8080/api/user/email?email=${email}`
      );
      const data = response.data;
      if (data.status === "sucess" || regex.test(email)) {
        return {
          error: false,
          msg: "올바른 이메일입니다.",
        };
      }
      if (email.trim() == "") {
        return {
          error: true,
          msg: "이메일을 입력하십시오.",
        };
      }
      return {
        error: true,
        msg: "올바른 이메일을 입력하십시오.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      msg: "데이터를 가지고 오는데 오류가 있습니다.",
    };
  }
};
