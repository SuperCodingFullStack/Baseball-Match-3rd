import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    email: "",
    passwd: "",
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPasswd(state, action) {
      state.passwd = action.payload;
    },
  },
});

export default signUpSlice;
export const signUpActions = signUpSlice.actions;
