import { Injectable } from '@nestjs/common';
import { SequencerConfiguration, Step } from './sequencer-configuration';
import { InstrumentId } from './instrument-id';
import { dorianScale, getScaleForOctave } from './lead/getScale';

@Injectable()
export class SequencerRepository {
  public static readonly DEFAULT_BPM = 120;
  public static readonly TOTAL_NO_STEPS = 16;

  private sequencerConfiguration: SequencerConfiguration = {
    bpm: SequencerRepository.DEFAULT_BPM,
    sequencerInstrumentStates: [
      {
        instrumentId: InstrumentId.DRUMS,
        instrumentDisplayName: 'Rhythm',
        tracks: ['kick', 'snare', 'clap', 'hihat_closed', 'hihat_open'].map(
          (sample) => ({
            name: sample,
            steps: this.createEmptySteps(),
          }),
        ),
      },
      {
        instrumentId: InstrumentId.LEAD,
        instrumentDisplayName: 'Lead',
        tracks: [
          ...getScaleForOctave(dorianScale, 4),
          ...getScaleForOctave(dorianScale, 5),
        ].map((note) => ({
          name: note,
          steps: this.createEmptySteps(),
        })),
      },
    ],
  };

  async getConfiguration(): Promise<SequencerConfiguration> {
    return this.sequencerConfiguration;
  }

  private createEmptySteps(): Step[] {
    const steps: Step[] = [];
    for (let i = 0; i < SequencerRepository.TOTAL_NO_STEPS; i++) {
      steps.push({ isOn: false });
    }
    return steps;
  }
}
