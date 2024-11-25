import { createSlice } from "@reduxjs/toolkit";

const signUpNestSlice = createSlice({
  name: "nest",
  initialState: {
    emailNest: false,
  },
  reducers: {
    setEmailNest(state) {
      state.emailNest = true;
    },
  },
});

export default signUpNestSlice;

export const signUpNestActions = signUpNestSlice.actions;
