import { Filter, PolySynth, Reverb, Synth } from "tone";
import SequencerInstrument from "../sequencerInstrument";
import { Instrument } from "../Instrument";
import { Track } from "../../types/track";

class LeadSynthSequencer extends SequencerInstrument {
  private readonly synthesizer: PolySynth;
  private readonly lowPassFilter: Filter;
  private tracks: Track[] = [];

  constructor(instrument: Instrument) {
    super(instrument);

    this.lowPassFilter = new Filter(800, "lowpass", -96).toDestination();
    const reverb = new Reverb(3).toDestination();

    this.synthesizer = new PolySynth(Synth, {
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 2,
      },
      volume: -12,
    })
      .connect(reverb)
      .connect(this.lowPassFilter);
  }

  play(note: string, scheduledTime: number): void {
    this.synthesizer.triggerAttackRelease(note, "16n", scheduledTime);
  }

  getNoOfSupportedTracks(): number {
    return this.tracks.length;
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  setTracks(tracks: Track[]): void {
    this.tracks = tracks;
  }
}
export default LeadSynthSequencer;
