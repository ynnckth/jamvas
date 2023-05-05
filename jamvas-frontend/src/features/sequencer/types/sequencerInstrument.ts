import { InstrumentId } from "../instruments/InstrumentId";
import { Track } from "./track";

export interface SequencerInstrument {
  id: InstrumentId;
  name: string;
  tracks: Track[];
}
