import React, { useState, useEffect } from "react";
import { addressCheck } from "../utils/addressCheck";
import { useDebouncedValue } from "./useDebouncedValue";

export const useAddress = (isTouched) => {
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState("");

  const addressChangeHandler = (value) => {
    setAddress(value);
  };

  return { address, addressChangeHandler, addressError, addressErrorMsg };
};
