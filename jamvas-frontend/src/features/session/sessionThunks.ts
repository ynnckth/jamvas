import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../../app/handleThunk";
import { sendRegisterUser } from "../../api/sessionApi";
import { User } from "../../types/User";

export const registerUser = createAsyncThunk<User, { name: string }, { rejectValue: string }>(
  "sessionSlice/registerUser",
  async (newUser, { rejectWithValue }) =>
    handleThunk(async () => {
      return await sendRegisterUser(newUser);
    }, rejectWithValue)
);
