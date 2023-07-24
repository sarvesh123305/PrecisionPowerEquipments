import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "adminUser",
  initialState: {
    adminUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.adminUser = action.payload;
    },
    logout: (state) => {
      state.adminUser = null;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export const selectAdminUser = (state) => state.user.adminUser;
export default adminSlice.reducer;
