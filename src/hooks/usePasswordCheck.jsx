import React, { useState, useEffect } from "react";
import { useDebouncedValue } from "./useDebouncedValue";

const usePasswordCheck = (password) => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [pwChkError, setPwChkError] = useState(false);
  const [pwChkMsg, setPwChkMsg] = useState("");
  const debouncedPasswdCheck = useDebouncedValue(passwordCheck, 200);

  useEffect(() => {
    const validatePwCheck = () => {
      if (passwordCheck && passwordCheck === password) {
        setPwChkError(false);
        setPwChkMsg("비밀번호 확인이 완료 되었습니다.");
      } else if (!passwordCheck) {
        setPwChkError(true);
        setPwChkMsg("입력해주세요.");
      } else {
        setPwChkError(true);
        setPwChkMsg("비밀번호가 서로 일치하지 않습니다.");
      }
    };
    if (debouncedPasswdCheck) validatePwCheck();
  }, [passwordCheck, debouncedPasswdCheck, password]);

  const pwChkHandler = (value, maxLength) => {
    setPasswordCheck(value);
    if (value.length > maxLength) {
      setPasswordCheck(value.slice(0, maxLength));
    }
  };

  return { passwordCheck, pwChkHandler, pwChkError, pwChkMsg };
};

export default usePasswordCheck;
