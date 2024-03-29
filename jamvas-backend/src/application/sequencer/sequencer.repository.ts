import { Injectable, Logger } from '@nestjs/common';
import { SequencerConfiguration, Step } from '../../domain/sequencer-configuration';
import { InstrumentId } from '../../domain/instrument-id';
import { dorianScale, getScaleForOctave } from './lead/getScale';

@Injectable()
export class SequencerRepository {
  private readonly logger = new Logger(SequencerRepository.name);

  public static readonly DEFAULT_BPM = 120;
  public static readonly TOTAL_NO_STEPS = 16;

  private sequencerConfiguration: SequencerConfiguration = {
    bpm: SequencerRepository.DEFAULT_BPM,
    sequencerInstrumentStates: [
      {
        instrumentId: InstrumentId.DRUMS,
        instrumentDisplayName: 'Rhythm',
        tracks: ['kick', 'snare', 'clap', 'hihat_closed', 'hihat_open'].map((sample) => ({
          name: sample,
          steps: this.createEmptySteps(),
        })),
      },
      {
        instrumentId: InstrumentId.LEAD,
        instrumentDisplayName: 'Lead',
        tracks: [...getScaleForOctave(dorianScale, 4), ...getScaleForOctave(dorianScale, 5)].reverse().map((note) => ({
          name: note,
          steps: this.createEmptySteps(),
        })),
      },
      {
        instrumentId: InstrumentId.BASS,
        instrumentDisplayName: 'Bass',
        tracks: [...getScaleForOctave(dorianScale, 3)].reverse().map((note) => ({
          name: note,
          steps: this.createEmptySteps(),
        })),
      },
    ],
  };

  async getConfiguration(): Promise<SequencerConfiguration> {
    return this.sequencerConfiguration;
  }

  async saveConfiguration(sequencerConfiguration: SequencerConfiguration): Promise<SequencerConfiguration> {
    this.sequencerConfiguration = sequencerConfiguration;
    this.logger.log('Saved updated sequencer configuration');
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
