import { Instrument } from "./Instrument";
import { Track } from "../types/track";
import { Seconds } from "tone/build/esm/core/type/Units";

abstract class SequencerInstrument {
  protected constructor(private _instrument: Instrument) {}

  abstract getNoOfSupportedTracks(): number;
  abstract getTracks(): Track[];
  abstract play(trackName: string, scheduledTime: Seconds): void;
  abstract setTracks(tracks: Track[]): void;
  get instrument(): Instrument {
    return this._instrument;
  }
}
export default SequencerInstrument;
