import React, { useState } from "react";

const useName = (isTouched) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");

  const validateName = () => {};

  const nameChangeHandler = (value, maxLength) => {
    setName(value);
  };

  return { name, validateName, nameChangeHandler, nameError, nameErrorMsg };
};

export default useName;
