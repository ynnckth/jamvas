import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { registerUser } from "./sessionThunks";

interface SessionSliceState {
  user?: User;
}

const initialState: SessionSliceState = {
  user: undefined,
};

export const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default sessionSlice.reducer;
