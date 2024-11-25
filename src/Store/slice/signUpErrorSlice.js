import { createSlice } from "@reduxjs/toolkit";

const signUpErrorSlice = createSlice({
  name: "signUpError",
  initialState: {
    email: {
      isError: false,
      errorMsg: "",
    },
    password: {
      isError: false,
      errorMsg: "",
    },
    passwordConfirm: {
      isError: false,
      errorMsg: "",
    },
  },
  reducers: {
    setEmailError(state, action) {
      state.email.isError = true;
      state.email.errorMsg = action.payload;
    },
    setEmailOk(state, action) {
      state.email.isError = false;
      state.email.errorMsg = action.payload;
    },
    setPasswordError(state, action) {
      state.password.isError = true;
      state.password.errorMsg = action.payload;
    },
    setPasswordOk(state) {
      state.password.isError = false;
      state.password.errorMsg = null;
    },
    setPasswordConfirmError(state, action) {
      state.passwordConfirm.isError = true;
      state.passwordConfirm.errorMsg = action.payload;
    },
  },
});

export default signUpErrorSlice;

export const signUpErrorActions = signUpErrorSlice.actions;
