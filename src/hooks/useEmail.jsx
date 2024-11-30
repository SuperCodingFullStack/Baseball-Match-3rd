import { useState } from 'react';
import { emailCheck } from '../utils/emailCheck';

const useEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

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

  const onChangeHandler = (value, maxLength) => {
    setEmail(value);
    if (value.length >= maxLength) {
      setEmail(value.slice(0, maxLength));
    }
  };

  return {
    email,
    setEmail: onChangeHandler,
    validateEmail,
    error,
    msg,
  };
};

export default useEmail;
