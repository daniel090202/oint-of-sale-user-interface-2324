import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      error: false,
      currentUser: null,
      isFetching: false,
    },
  },
  reducers: {
    logInStart: (state) => {
      state.login.isFetching = true;
    },
    logInSuccess: (state, action) => {
      state.login.error = false;
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
    },
    logInFail: (state) => {
      state.login.error = true;
      state.login.isFetching = false;
    },
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.login.error = false;
      state.login.isFetching = true;
      state.login.currentUser = null;
    },
    logOutFail: (state) => {
      state.login.error = true;
      state.login.isFetching = false;
    },
  },
});

export default authSlice.reducer;
export const {
  logInFail,
  logOutFail,
  logInStart,
  logOutStart,
  logInSuccess,
  logOutSuccess,
} = authSlice.actions;
