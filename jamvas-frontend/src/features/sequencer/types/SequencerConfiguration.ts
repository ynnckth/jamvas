import { InstrumentId } from "../instruments/InstrumentId";

export interface SequencerConfiguration {
  bpm: number;
  sequencerInstrumentStates: SequencerInstrumentState[];
}

export interface SequencerInstrumentState {
  instrumentId: InstrumentId;
  instrumentDisplayName: string;
  tracks: Track[];
}

export interface Track {
  name: string;
  steps: Step[];
}

export interface Step {
  isOn: boolean;
}
