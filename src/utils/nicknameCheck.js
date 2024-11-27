import axios from "axios";

export const nicknameCheck = async (nickname) => {
  const regex = /^[a-zA-Z0-9가-힣_-]{2,20}$/;

  try {
    if (nickname) {
      const response = await axios.get(
        `http://localhost:8080/api/user/nickname=${nickname}`
      );
      if (response.data.status === "success") {
        if (regex.test(nickname)) {
          return {
            error: false,
            msg: response.data.data,
          };
        } else {
          return {
            error: true,
            msg: "올바르지 않은 닉네임입니다.",
          };
        }
      }
    }
  } catch (err) {
    console.error(err);
    return {
      error: true,
      msg: "데이터 패치에 실패했습니다.",
    };
  }
};
