import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../handleThunk";
import { AppVersion } from "../../types/AppVersion";
import { fetchAppVersion } from "../../api/appApi";

export const getServerVersion = createAsyncThunk<AppVersion, void, { rejectValue: string }>(
  "appSlice/getServerVersion",
  async (_, { rejectWithValue }) =>
    handleThunk(async () => {
      return await fetchAppVersion();
    }, rejectWithValue)
);
