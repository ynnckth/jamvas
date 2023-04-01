import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunk } from "../../app/handleThunk";
import Sequencer from "./sequencer";
import { Instrument } from "./instruments/Instrument";
import { RootState } from "../../app/store";
import { Track } from "./types/track";

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
  { instrument: Instrument; updatedTracks: Track[] },
  { instrument: Instrument; trackIndex: number; stepIndex: number; newValue: boolean },
  { rejectValue: string }
>(
  "sequencerSlice/setInstrumentGridValue",
  async ({ instrument, trackIndex, stepIndex, newValue }, { rejectWithValue, getState }) =>
    handleThunk(async () => {
      const sequencerState = (getState() as RootState).sequencerSlice;
      const instrumentToUpdate = sequencerState.sequencerInstruments.find((i) => i.id === instrument)!;
      const updatedTrack: Track = {
        ...instrumentToUpdate.grid[trackIndex],
        steps: instrumentToUpdate.grid[trackIndex].steps.map((step, i) => {
          if (i !== stepIndex) {
            return step;
          }
          return { isOn: newValue };
        }),
      };
      const updatedTracks: Track[] = instrumentToUpdate.grid.map((track) => {
        if (track.name !== updatedTrack.name) {
          return track;
        }
        return updatedTrack;
      });
      return {
        instrument,
        updatedTracks,
      };
    }, rejectWithValue)
);
