import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { getAllUsers, registerUser } from "./sessionThunks";

interface SessionSliceState {
  currentUser?: User;
  allUsersInSession: User[];
}

const initialState: SessionSliceState = {
  currentUser: undefined,
  allUsersInSession: [],
};

export const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {
    updateUsersInSession: (state, action: PayloadAction<User[]>) => {
      state.allUsersInSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsersInSession = action.payload;
    });
  },
});
export const { updateUsersInSession } = sessionSlice.actions;
export default sessionSlice.reducer;
