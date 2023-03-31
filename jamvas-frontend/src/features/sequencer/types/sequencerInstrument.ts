import { Instrument } from "../instruments/Instrument";
import { Track } from "./track";

export interface SequencerInstrument {
  id: Instrument;
  name: string;
  grid: Track[];
}