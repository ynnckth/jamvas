import { Instrument } from "./Instrument";
import { Seconds } from "tone/build/esm/core/type/Units";

abstract class SequencerInstrument {
  protected constructor(private _instrument: Instrument) {}

  abstract play(trackName: string, scheduledTime: Seconds): void;
  get instrument(): Instrument {
    return this._instrument;
  }
}
export default SequencerInstrument;
