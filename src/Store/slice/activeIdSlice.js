import { createSlice } from "@reduxjs/toolkit";
import { linkSection } from "../../pages/Signup/linkSection";

const activeIdSlice = createSlice({
  name: "activeId",
  initialState: {
    activeId: linkSection[0].id,
  },
  reducers: {
    changeActive(state, action) {
      state.activeId = action.payload;
    },
  },
});

export default activeIdSlice;

export const activeIdActions = activeIdSlice.actions;
