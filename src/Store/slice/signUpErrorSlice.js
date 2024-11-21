import { createSlice } from "@reduxjs/toolkit";

const signUpErrorSlice = createSlice({
  name: "signUpError",
  initialState: {
    email: {
      isError: false,
      errorMsg: "",
    },
  },
  reducers: {
    setEmailError(state, action) {
      state.email.isError = true;
      state.email.errorMsg = action.payload;
    },
  },
});

export default signUpErrorSlice;

export const signUpErrorActions = signUpErrorSlice.actions;
