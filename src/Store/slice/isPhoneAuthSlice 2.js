import { createSlice } from "@reduxjs/toolkit";

export const isPhoneAuthSlice = createSlice({
  name: "PhoneAuth",
  initialState: {
    isPhoneAuth: false,
    isAddressAuth: false,
  },
  reducers: {
    setIsPhoneAuth(state) {
      state.isPhoneAuth = true;
    },
    setIsAddressAuth(state) {
      state.isAddressAuth = true;
    },
  },
});

export const isPhoneAuthActions = isPhoneAuthSlice.actions;
