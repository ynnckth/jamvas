import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { registerUser } from "./sessionThunks";

interface SessionSliceState {
  self?: User;
  otherUsersInSession: User[];
}

const initialState: SessionSliceState = {
  self: undefined,
  otherUsersInSession: [],
};

export const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {
    updateUsersInSession: (state, action: PayloadAction<User[]>) => {
      state.otherUsersInSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.self = action.payload;
    });
  },
});
export const { updateUsersInSession } = sessionSlice.actions;
export default sessionSlice.reducer;
