import React, { useState, useEffect } from "react";
import { useDebouncedValue } from "./useDebouncedValue";
import { emailCheck } from "../utils/emailCheck";

const useEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const debouncedEmail = useDebouncedValue(email, 300);

  useEffect(() => {
    const validateEmail = async () => {
      const res = await emailCheck(email);
      setError(res.error);
      setErrorMsg(res.msg);
    };
    if (debouncedEmail) validateEmail();
  }, [debouncedEmail]);

  const emailChangeHandler = (val, maxLength) => {
    setEmail(val);
    if (val.length >= maxLength) {
      setEmail(val.slice(0, maxLength));
    }
  };

  return {
    email,
    emailChangeHandler,
    error,
    errorMsg,
    debouncedEmail,
  };
};

export default useEmail;
