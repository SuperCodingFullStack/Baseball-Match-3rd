import React, { useState, useEffect } from "react";
import { emailCheck } from "../utils/emailCheck";

const useEmail = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const validateEmail = async () => {
    try {
      const res = await emailCheck(email);
      if (res.error) {
        setError(true);
      } else {
        setError(false);
      }
      setMsg(res.msg);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (value) => {
    setEmail(value);
  };

  const onFocusHandler = () => {
    setIsTouched(true);
  };

  return {
    email,
    setEmail: onChangeHandler,
    setFocus: onFocusHandler,
    isTouched,
    validateEmail,
    error,
    msg,
  };
};

export default useEmail;
