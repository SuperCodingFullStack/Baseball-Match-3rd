import React, { useState, useEffect } from "react";
import { passwdCheck } from "../utils/passwdCheck";
import { useDebouncedValue } from "./useDebouncedValue";

const usePassword = () => {
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [pwMsg, setPwMsg] = useState("");
  const debouncedPassword = useDebouncedValue(password, 200);

  useEffect(() => {
    const validatePassword = () => {
      const res = passwdCheck(password);
      setPwError(res.isError);
      setPwMsg(res.msg);
    };
    if (debouncedPassword) validatePassword();
  }, [password, debouncedPassword]);

  const passwordChange = (value, maxLength) => {
    setPassword(value);
    if (value.length >= maxLength) {
      setPassword(value.slice(0, maxLength));
    }
  };

  return { password, passwordChange, pwError, pwMsg };
};

export default usePassword;
