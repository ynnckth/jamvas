import { Instrument } from "./Instrument";
import { Track } from "../types/track";

abstract class SequencerInstrument {
  protected constructor(private _instrument: Instrument) {}

  abstract getNoOfSupportedTracks(): number;
  abstract getTracks(): Track[];
  abstract play(): void;
  abstract setTracks(tracks: Track[]): void;
  get instrument(): Instrument {
    return this._instrument;
  }
}
export default SequencerInstrument;
