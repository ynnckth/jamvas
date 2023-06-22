import { RootState } from "../store";

export const selectSequencerConfiguration = (state: RootState) => state.sequencerSlice.sequencerConfiguration;
export const selectCurrentStep = (state: RootState) => state.sequencerSlice.currentlyActiveStep;
export const selectIsSequencerStopped = (state: RootState) => state.sequencerSlice.isSequencerStopped;
export const selectIsToneInitialized = (state: RootState) => state.sequencerSlice.isToneInitialized;
