import { createSlice } from "@reduxjs/toolkit";

const activeIdSlice = createSlice({
  name: "activeId",
  initialState: {
    activeId: null,
  },
  reducers: {
    changeActive(state, action) {
      state.activeId = action.payload;
    },
  },
});

export default activeIdSlice;

export const activeIdActions = activeIdSlice.actions;
