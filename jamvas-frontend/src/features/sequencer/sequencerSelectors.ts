import { RootState } from "../../app/store";

export const selectSequencerInstruments = (state: RootState) => state.sequencerSlice.sequencerInstruments;
export const selectCurrentStep = (state: RootState) => state.sequencerSlice.currentlyActiveStep;
