import { createSlice } from "@reduxjs/toolkit";
import { drumSequencer } from "./instruments/drums/drumSequencer";
import { SequencerInstrument } from "./types/sequencerInstrument";

interface SequencerSliceState {
  bpm: number;
  currentlyActiveStep: number;
  totalNoOfSteps: number;
  sequencerInstruments: SequencerInstrument[];
}

const initialState: SequencerSliceState = {
  bpm: 120,
  currentlyActiveStep: 0,
  totalNoOfSteps: 8,
  sequencerInstruments: [drumSequencer],
};

export const sequencerSlice = createSlice({
  name: "sequencerSlice",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default sequencerSlice.reducer;
