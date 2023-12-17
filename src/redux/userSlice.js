import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: { error: false, allUsers: null, isFetching: false },
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.error = true;
      state.users.isFetching = false;
    },
  },
});

export default userSlice.reducer;
export const { getUsersStart, getUsersFailed, getUsersSuccess } = userSlice.actions;
