import React, { useState, useEffect } from "react";
import { addressCheck } from "../utils/addressCheck";

export const useAddress = (isTouched) => {
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState("");

  useEffect(() => {
    if (address) {
      const addressResponse = addressCheck(address);
      if (addressResponse.error) {
        setAddressError(true);
        setAddressErrorMsg(phoneResponse.msg);
      } else {
        setAddressError(false);
      }
    }
  }, [address]);

  const addressChangeHandler = (value) => {
    setAddress(value);
  };

  return { address, addressChangeHandler, addressError, addressErrorMsg };
};
