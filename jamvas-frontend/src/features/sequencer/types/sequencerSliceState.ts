import { SequencerInstrument } from "./sequencerInstrument";

export interface SequencerSliceState {
  isToneInitialized: boolean;
  bpm: number;
  currentlyActiveStep: number;
  isSequencerStopped: boolean;
  sequencerInstruments: SequencerInstrument[];
}
