import { createSlice } from "@reduxjs/toolkit";
import { drumSequencer } from "./instruments/drums/drumSequencer";
import { SequencerInstrument } from "./types/sequencerInstrument";
import { setBpm, startSequencer, stopSequencer } from "./sequencerThunks";

interface SequencerSliceState {
  bpm: number;
  currentlyActiveStep: number;
  totalNoOfSteps: number;
  isSequencerStopped: boolean;
  sequencerInstruments: SequencerInstrument[];
}

const initialState: SequencerSliceState = {
  bpm: 120,
  currentlyActiveStep: 0,
  totalNoOfSteps: 8,
  isSequencerStopped: true,
  sequencerInstruments: [drumSequencer],
};

export const sequencerSlice = createSlice({
  name: "sequencerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setBpm.fulfilled, (state, action) => {
        state.bpm = action.payload;
      })
      .addCase(startSequencer.fulfilled, (state) => {
        state.isSequencerStopped = false;
      })
      .addCase(stopSequencer.fulfilled, (state) => {
        state.isSequencerStopped = true;
      });
  },
});

export default sequencerSlice.reducer;
