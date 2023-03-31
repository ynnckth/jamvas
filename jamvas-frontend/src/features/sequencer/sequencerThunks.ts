import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../../app/handleThunk";
import Sequencer from "./sequencer";

// TODO: do we really need to store any state in redux or is it sufficient to store everything in the sequencer itself?

export const setBpm = createAsyncThunk<number, { newBpm: number; sequencer: Sequencer }, { rejectValue: string }>(
  "sequencerSlice/setBpm",
  async ({ newBpm, sequencer }, { rejectWithValue }) =>
    handleThunk(async () => {
      sequencer.setBpm(newBpm);
      return newBpm;
    }, rejectWithValue)
);

export const startSequencer = createAsyncThunk<boolean, { sequencer: Sequencer }, { rejectValue: string }>(
  "sequencerSlice/startSequencer",
  async ({ sequencer }, { rejectWithValue }) =>
    handleThunk(async () => {
      sequencer.start();
      return true;
    }, rejectWithValue)
);

export const stopSequencer = createAsyncThunk<boolean, { sequencer: Sequencer }, { rejectValue: string }>(
  "sequencerSlice/stopSequencer",
  async ({ sequencer }, { rejectWithValue }) =>
    handleThunk(async () => {
      sequencer.stop();
      return false;
    }, rejectWithValue)
);
