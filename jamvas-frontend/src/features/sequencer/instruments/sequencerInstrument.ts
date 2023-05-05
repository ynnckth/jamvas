import { InstrumentId } from "./InstrumentId";
import { Seconds } from "tone/build/esm/core/type/Units";

abstract class SequencerInstrument {
  protected constructor(private _id: InstrumentId) {}

  abstract play(trackName: string, scheduledTime: Seconds): void;
  get id(): InstrumentId {
    return this._id;
  }
}
export default SequencerInstrument;
