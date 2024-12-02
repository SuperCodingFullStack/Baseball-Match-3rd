import React, { useState, useEffect } from "react";
import { nicknameCheck } from "../utils/nicknameCheck";
import { useDebouncedValue } from "./useDebouncedValue";

const useNickname = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");
  const debouncedNickname = useDebouncedValue(nickname, 200);

  useEffect(() => {
    const validateNickname = () => {
      const res = nicknameCheck(nickname);
      setNicknameError(res.error);
      setNicknameErrorMsg(res.msg);
    };
    if (debouncedNickname) validateNickname();
  }, [debouncedNickname, nickname]);

  const nicknameChangeHandler = (value, maxLength) => {
    setNickname(value);
    if (value.length > maxLength) {
      setNickname(value.slice(0, maxLength));
    }
  };

  return {
    nickname,
    nicknameChangeHandler,
    nicknameError,
    nicknameErrorMsg,
  };
};

export default useNickname;
