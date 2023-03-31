import { RootState } from "../../app/store";

export const selectSequencerInstruments = (state: RootState) => state.sequencerSlice.sequencerInstruments;
export const selectCurrentStep = (state: RootState) => state.sequencerSlice.currentlyActiveStep;
export const selectIsSequencerStopped = (state: RootState) => state.sequencerSlice.isSequencerStopped;
export const selectCurrentBpm = (state: RootState) => state.sequencerSlice.bpm;
