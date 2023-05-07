import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../../app/handleThunk";
import { InstrumentId } from "./instruments/InstrumentId";
import { start, Transport } from "tone";
import { MAX_BPM, MIN_BPM } from "./constants";
import { fetchSequencerConfiguration } from "../../api/sequencerApi";
import { SequencerConfiguration } from "./types/SequencerConfiguration";

export const initializeTone = createAsyncThunk<void, void, { rejectValue: string }>(
  "sequencerSlice/initializeTone",
  async (_, { rejectWithValue }) =>
    handleThunk(async () => {
      await start();
      console.log("Tone.js initialized");
    }, rejectWithValue)
);

export const getSequencerConfiguration = createAsyncThunk<SequencerConfiguration, void, { rejectValue: string }>(
  "sequencerSlice/getSequencerConfiguration",
  async (_, { rejectWithValue }) =>
    handleThunk(async () => {
      return await fetchSequencerConfiguration();
    }, rejectWithValue)
);

export const setBpm = createAsyncThunk<number, { newBpm: number }, { rejectValue: string }>(
  "sequencerSlice/setBpm",
  async ({ newBpm }, { rejectWithValue }) =>
    handleThunk(async () => {
      if (newBpm < MIN_BPM || newBpm > MAX_BPM) {
        throw new Error(`${newBpm} BPM is not within allowed boundaries`);
      }
      Transport.bpm.rampTo(newBpm, 1);
      return newBpm;
    }, rejectWithValue)
);

export const startSequencer = createAsyncThunk<boolean, void, { rejectValue: string }>(
  "sequencerSlice/startSequencer",
  async (_, { rejectWithValue }) => handleThunk(async () => true, rejectWithValue)
);

export const stopSequencer = createAsyncThunk<boolean, void, { rejectValue: string }>(
  "sequencerSlice/stopSequencer",
  async (_, { rejectWithValue }) => handleThunk(async () => false, rejectWithValue)
);

export const setInstrumentGridValue = createAsyncThunk<
  { instrument: InstrumentId; trackIndex: number; stepIndex: number; newValue: boolean },
  { instrument: InstrumentId; trackIndex: number; stepIndex: number; newValue: boolean },
  { rejectValue: string }
>(
  "sequencerSlice/setInstrumentGridValue",
  async ({ instrument, trackIndex, stepIndex, newValue }, { rejectWithValue }) =>
    handleThunk(async () => {
      return {
        instrument,
        trackIndex,
        stepIndex,
        newValue,
      };
    }, rejectWithValue)
);
