import React, { useState, useEffect } from 'react';
import { phoneCheck } from '../utils/phoneCheck';
import { useDebouncedValue } from './useDebouncedValue';

const usePhone = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const debouncedPhone = useDebouncedValue(phone, 200);

  useEffect(() => {
    const validatePhone = () => {
      const res = phoneCheck(phone);
      setPhoneError(res.error);
      setPhoneErrorMsg(res.msg);
    };
    if (debouncedPhone) validatePhone();
  }, [debouncedPhone, phone]);

  const phoneChangeHandler = (value) => {
    setPhone(value);
  };

  return {
    phone,
    phoneChangeHandler,
    phoneError,
    phoneErrorMsg,
  };
};

export default usePhone;
