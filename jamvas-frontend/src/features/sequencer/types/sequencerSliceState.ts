import { SequencerInstrument } from "./sequencerInstrument";

export interface SequencerSliceState {
  bpm: number;
  currentlyActiveStep: number;
  isSequencerStopped: boolean;
  sequencerInstruments: SequencerInstrument[];
}