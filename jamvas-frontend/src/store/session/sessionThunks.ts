import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../handleThunk";
import { fetchUsers, sendRegisterUser } from "../../api/sessionApi";
import { User } from "../../types/User";

export const registerUser = createAsyncThunk<User, { name: string }, { rejectValue: string }>(
  "sessionSlice/registerUser",
  async (newUser, { rejectWithValue }) =>
    handleThunk(async () => {
      return await sendRegisterUser(newUser);
    }, rejectWithValue)
);

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "sessionSlice/getAllUsers",
  async (_, { rejectWithValue }) =>
    handleThunk(async () => {
      return await fetchUsers();
    }, rejectWithValue)
);
