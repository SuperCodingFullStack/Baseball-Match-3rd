import { createSlice } from "@reduxjs/toolkit";

const isNestSlice = createSlice({
  name: "isNest",
  initialState: {
    emailNest: false,
    nicknameNest: false,
  },
  reducers: {
    setEmailNest(state) {
      state.emailNest = true;
    },
    setNicknameNest(state) {
      state.nicknameNest = true;
    },
  },
});

export default isNestSlice;
export const isNestActions = isNestSlice.actions;
