import { Sampler } from "tone";
import SequencerInstrument from "../sequencerInstrument";
import { Instrument } from "../Instrument";
import { samples } from "./samples";

class DrumSequencer extends SequencerInstrument {
  private sampler: Sampler;

  constructor(instrument: Instrument) {
    super(instrument);
    this.sampler = new Sampler({
      urls: {
        ...samples.reduce((samplesDict: any, sample) => ((samplesDict[sample.key] = sample.urlPath), samplesDict), {}),
      },
    }).toDestination();
  }

  play(track: string, scheduledTime: number): void {
    this.sampler.triggerAttack(samples.find((sample) => sample.id === track)!.key, scheduledTime, 0.4);
  }
}
export default DrumSequencer;
