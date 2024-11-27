import axios from "axios";

export const emailCheck = async (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    if (email) {
      const response = await axios.get(
        `http://localhost:8080/api/user/username?username=${email}`
      );
      console.log(response.data);
      if (response.data.status === "success") {
        if (regex.test(email)) {
          return {
            error: false,
            msg: response.data.data,
          };
        } else {
          return {
            error: true,
            msg: "형식에 맞지 않는 이메일입니다.",
          };
        }
      } else {
        return {
          error: true,
          msg: response.data.data,
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      msg: "데이터를 가지고 오는데 오류가 있습니다.",
    };
  }
};
