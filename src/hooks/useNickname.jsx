import React, { useState } from "react";
import { nicknameCheck } from "../utils/nicknameCheck";

const useNickname = (isTouched) => {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");

  const validateNickname = async () => {
    const nicknameResponse = await nicknameCheck(nickname);
    if (nicknameResponse.error) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
    setNicknameErrorMsg(nicknameResponse.msg);
  };

  const nicknameChangeHandler = (value, maxLength) => {
    setNickname(value);
    if (value.length > maxLength) {
      setNickname(value.slice(0, maxLength));
    }
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
