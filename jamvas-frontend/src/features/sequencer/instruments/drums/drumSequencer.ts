import { Sampler } from "tone";
import SequencerInstrument from "../sequencerInstrument";
import { Instrument } from "../Instrument";
import { samples } from "./samples";
import { Track } from "../../types/track";
import { Seconds } from "tone/build/esm/core/type/Units";

class DrumSequencer extends SequencerInstrument {
  private sampler: Sampler;
  private tracks: Track[] = [];

  constructor(instrument: Instrument) {
    super(instrument);
    this.sampler = new Sampler({
      urls: {
        ...samples.reduce((samplesDict: any, sample) => ((samplesDict[sample.key] = sample.urlPath), samplesDict), {}),
      },
    }).toDestination();
  }

  play(trackName: string, scheduledTime: Seconds): void {
    const sampleToPlay = samples.find((sample) => sample.name === trackName)!;
    this.sampler.triggerAttack(sampleToPlay.key, scheduledTime, 0.4);
  }

  getNoOfSupportedTracks(): number {
    return samples.length;
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  setTracks(tracks: Track[]): void {
    this.tracks = tracks;
  }
}
export default DrumSequencer;
