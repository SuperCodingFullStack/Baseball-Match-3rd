import React, { useState, useEffect } from "react";
import { passwdCheck } from "../utils/passwdCheck";

const usePassword = (isTouched) => {
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    if (isTouched) {
      validatePw();
    }
  }, [password]);

  const validatePw = () => {
    const passwordResponse = passwdCheck(password);
    if (passwordResponse.isError) {
      setPwError(true);
    } else {
      setPwError(false);
    }
    setPwMsg(passwordResponse.msg);
  };

  const passwordChange = (value, maxLength) => {
    setPassword(value);
    if (value.length >= maxLength) {
      setPassword(value.slice(0, maxLength));
    }
  };

  return { password, validatePw, passwordChange, pwError, pwMsg };
};

export default usePassword;
