import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { drumSequencerState } from "./instruments/drums/drumSequencerState";
import { SequencerInstrument } from "./types/sequencerInstrument";
import { setBpm, startSequencer, stopSequencer } from "./sequencerThunks";

interface SequencerSliceState {
  bpm: number;
  currentlyActiveStep: number;
  isSequencerStopped: boolean;
  sequencerInstruments: SequencerInstrument[];
}

const initialState: SequencerSliceState = {
  bpm: 120,
  currentlyActiveStep: 0,
  isSequencerStopped: true,
  sequencerInstruments: [drumSequencerState],
};

export const sequencerSlice = createSlice({
  name: "sequencerSlice",
  initialState,
  reducers: {
    setCurrentlyActiveStep: (state, action: PayloadAction<number>) => {
      console.log("Currently active step: ", action.payload);
      state.currentlyActiveStep = action.payload;
    },
  },
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

export const { setCurrentlyActiveStep } = sequencerSlice.actions;
export default sequencerSlice.reducer;
