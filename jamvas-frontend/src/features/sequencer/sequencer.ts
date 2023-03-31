import { Sequence, Transport } from "tone";
import { Observable, Subject } from "rxjs";
import { MAX_BPM, MIN_BPM, TOTAL_NO_STEPS } from "./constants";
import SequencerInstrument from "./instruments/sequencerInstrument";

class Sequencer {
  private $currentStep: Subject<number> = new Subject();
  private sequence: Sequence;

  constructor(private _instruments: SequencerInstrument[]) {
    this.sequence = new Sequence(
      (time, step) => {
        this.$currentStep.next(step);
        // TODO: play instruments
        /*
        this._instruments.forEach((instrument) => {
          instrument.grid.forEach((track, trackIndex) => {
            if (instrument.grid[trackIndex][step] === 1) {
              instrument.play(instrument.tracks[trackIndex], time);
            }
          });
        });
         */
      },
      Array.from(Array(TOTAL_NO_STEPS).keys()),
      "16n"
    );
  }

  start() {
    Transport.start();
    this.sequence.start();
  }

  stop() {
    Transport.stop();
    this.sequence.stop();
  }

  setBpm(bpm: number) {
    if (bpm < MIN_BPM || bpm > MAX_BPM) {
      console.error(`${bpm} BPM is not within allowed boundaries`);
      return;
    }
    Transport.bpm.rampTo(bpm, 1);
  }

  onStepChanged(): Observable<number> {
    return this.$currentStep.asObservable();
  }
}

export default Sequencer;
