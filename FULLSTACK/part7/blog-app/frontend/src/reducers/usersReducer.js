import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    //ACTION CREATOR 1
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

//ASYNC ACTION 1 (GET ALL USERS DATA)
export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;
