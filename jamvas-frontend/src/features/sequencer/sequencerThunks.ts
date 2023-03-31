import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../../app/handleThunk";
import Sequencer from "./sequencer";
import { Instrument } from "./instruments/Instrument";

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

export const setInstrumentGridValue = createAsyncThunk<
  { instrument: Instrument; trackIndex: number; stepIndex: number; newValue: boolean },
  { instrument: Instrument; trackIndex: number; stepIndex: number; newValue: boolean },
  { rejectValue: string }
>(
  "sequencerSlice/setInstrumentGridValue",
  async ({ instrument, trackIndex, stepIndex, newValue }, { rejectWithValue }) =>
    handleThunk(async () => {
      return { instrument, trackIndex, stepIndex, newValue };
    }, rejectWithValue)
);
