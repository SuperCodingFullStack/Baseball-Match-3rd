import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    email: "",
    passwd: "",
    passwdConfirm: "",
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPasswd(state, action) {
      state.passwd = action.payload;
    },
    setPasswdConfirm(state, action) {
      state.passwdConfirm = action.payload;
    },
  },
});

export default signUpSlice;
export const signUpActions = signUpSlice.actions;
