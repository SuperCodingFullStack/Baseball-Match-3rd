import React, { useState, useEffect } from "react";
import { phoneCheck } from "../utils/phoneCheck";

const usePhone = (isTouched) => {
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");

  useEffect(() => {
    if (phone) {
      const phoneResponse = phoneCheck(phone);
      if (phoneResponse.error) {
        setPhoneError(true);
        setPhoneErrorMsg(phoneResponse.msg);
      } else {
        setPhoneError(false);
      }
    }
  }, [phone]);

  const phoneChangeHandler = (value) => {
    setPhone(value);
  };

  const phoneCodeChangeHandler = (values) => {
    setPhoneCode(values);
  };

  return {
    phone,
    phoneCode,
    phoneChangeHandler,
    phoneCodeChangeHandler,
    phoneError,
    phoneErrorMsg,
  };
};

export default usePhone;
