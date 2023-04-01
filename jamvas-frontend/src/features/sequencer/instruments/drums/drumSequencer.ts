import { Sampler } from "tone";
import SequencerInstrument from "../sequencerInstrument";
import { Instrument } from "../Instrument";
import { samples } from "./samples";
import { Track } from "../../types/track";

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

  // TODO: play actual sample at track index
  play(): void {
    console.log("Requested to play drum sequencer");
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
