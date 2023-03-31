import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../../app/handleThunk";

export const setBpm = createAsyncThunk<number, number, { rejectValue: string }>(
  "sequencerSlice/setBpm",
  async (newBpm: number, { rejectWithValue }) =>
    handleThunk(async () => {
      // TODO: update bpm of sequencer
      return newBpm;
    }, rejectWithValue)
);

export const startSequencer = createAsyncThunk<boolean, void, { rejectValue: string }>(
  "sequencerSlice/startSequencer",
  async (_, { rejectWithValue }) =>
    handleThunk(async () => {
      // TODO: start sequencer
      return true;
    }, rejectWithValue)
);

export const stopSequencer = createAsyncThunk<boolean, void, { rejectValue: string }>(
  "sequencerSlice/stopSequencer",
  async (_, { rejectWithValue }) =>
    handleThunk(async () => {
      // TODO: stop sequencer
      return false;
    }, rejectWithValue)
);
