import React, { useState } from "react";

const useNickname = (isTouched) => {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");

  const validateNickname = () => {};

  const nicknameChangeHandler = (value, maxLength) => {
    setNickname(value);
  };

  return {
    nickname,
    validateNickname,
    nicknameChangeHandler,
    nicknameError,
    nicknameErrorMsg,
  };
};

export default useNickname;
