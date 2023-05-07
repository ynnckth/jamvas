import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getSequencerConfiguration,
  initializeTone,
  setBpm,
  setInstrumentGridValue,
  startSequencer,
  stopSequencer,
} from "./sequencerThunks";
import { SequencerConfiguration } from "./types/SequencerConfiguration";

interface SequencerSliceState {
  isToneInitialized: boolean;
  currentlyActiveStep: number;
  isSequencerStopped: boolean;
  sequencerConfiguration?: SequencerConfiguration;
}

const initialState: SequencerSliceState = {
  isToneInitialized: false,
  currentlyActiveStep: 0,
  isSequencerStopped: true,
  sequencerConfiguration: undefined,
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
      .addCase(getSequencerConfiguration.fulfilled, (state, action) => {
        state.sequencerConfiguration = action.payload;
      })
      .addCase(setBpm.fulfilled, (state, action) => {
        if (state.sequencerConfiguration) state.sequencerConfiguration.bpm = action.payload;
      })
      .addCase(startSequencer.fulfilled, (state) => {
        state.isSequencerStopped = false;
      })
      .addCase(stopSequencer.fulfilled, (state) => {
        state.isSequencerStopped = true;
      })
      // TODO: move this logic to the backend and handle websocket config state update instead
      .addCase(setInstrumentGridValue.fulfilled, (state, action) => {
        const { instrument, trackIndex, stepIndex, newValue } = action.payload;
        const updatedInstrument = state.sequencerConfiguration?.sequencerInstrumentStates.find(
          (i) => i.instrumentId === instrument
        )!;
        updatedInstrument.tracks[trackIndex].steps[stepIndex].isOn = newValue;
      });
  },
});

export const { setCurrentlyActiveStep } = sequencerSlice.actions;
export default sequencerSlice.reducer;
