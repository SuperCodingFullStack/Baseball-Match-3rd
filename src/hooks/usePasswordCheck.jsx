import React, { useState, useEffect } from "react";

const usePasswordCheck = (password, isTouched) => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [pwChkError, setPwChkError] = useState(false);
  const [pwChkMsg, setPwChkMsg] = useState("");

  useEffect(() => {
    if (isTouched) {
      validatePwChk();
    }
  }, [passwordCheck]);

  const validatePwChk = () => {
    if (passwordCheck.trim() === "" || passwordCheck !== password) {
      setPwChkError(true);
      setPwChkMsg("비밀번호가 비어있거나 일치하지 않습니다.");
    } else {
      setPwChkError(false);
      setPwChkMsg("비밀번호가 일치합니다.");
    }
  };

  const pwChkHandler = (value, maxLength) => {
    setPasswordCheck(value);
    if (value.length > maxLength) {
      setPasswordCheck(value.slice(0, maxLength));
    }
  };

  return { passwordCheck, validatePwChk, pwChkHandler, pwChkError, pwChkMsg };
};

export default usePasswordCheck;
