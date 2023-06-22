import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { getAllUsers, registerUser } from "./sessionThunks";

interface SessionSliceState {
  self?: User;
  allUsersInSession: User[];
}

const initialState: SessionSliceState = {
  self: undefined,
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
      state.self = action.payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsersInSession = action.payload;
    });
  },
});
export const { updateUsersInSession } = sessionSlice.actions;
export default sessionSlice.reducer;
