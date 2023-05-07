import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { drumSequencerState, leadSynthSequencerState } from "./instruments/instrumentsState";
import { initializeTone, setBpm, setInstrumentGridValue, startSequencer, stopSequencer } from "./sequencerThunks";
import { SequencerInstrument } from "./types/sequencerInstrument";

interface SequencerSliceState {
  isToneInitialized: boolean;
  bpm: number;
  currentlyActiveStep: number;
  isSequencerStopped: boolean;
  sequencerInstruments: SequencerInstrument[];
}

const initialState: SequencerSliceState = {
  isToneInitialized: false,
  bpm: 120,
  currentlyActiveStep: 0,
  isSequencerStopped: true,
  sequencerInstruments: [drumSequencerState, leadSynthSequencerState],
};

export const sequencerSlice = createSlice({
  name: "sequencerSlice",
  initialState,
  reducers: {
    setCurrentlyActiveStep: (state, action: PayloadAction<number>) => {
      state.currentlyActiveStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeTone.fulfilled, (state) => {
        state.isToneInitialized = true;
      })
      .addCase(setBpm.fulfilled, (state, action) => {
        state.bpm = action.payload;
      })
      .addCase(startSequencer.fulfilled, (state) => {
        state.isSequencerStopped = false;
      })
      .addCase(stopSequencer.fulfilled, (state) => {
        state.isSequencerStopped = true;
      })
      .addCase(setInstrumentGridValue.fulfilled, (state, action) => {
        const { instrument, trackIndex, stepIndex, newValue } = action.payload;
        const updatedInstrument = state.sequencerInstruments.find((i) => i.id === instrument)!;
        updatedInstrument.tracks[trackIndex].steps[stepIndex].isOn = newValue;
      });
  },
});

export const { setCurrentlyActiveStep } = sequencerSlice.actions;
export default sequencerSlice.reducer;
