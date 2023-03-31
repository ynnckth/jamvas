import { Instrument } from "./Instrument";

abstract class SequencerInstrument {
  protected constructor(private _instrument: Instrument) {}
}
export default SequencerInstrument;
