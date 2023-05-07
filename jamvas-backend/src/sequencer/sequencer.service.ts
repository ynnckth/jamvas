import { Injectable } from '@nestjs/common';
import { SequencerRepository } from './sequencer.repository';
import { SequencerConfiguration } from './sequencer-configuration';
import { InstrumentId } from './instrument-id';

@Injectable()
export class SequencerService {
  constructor(private sequencerRepository: SequencerRepository) {}

  getConfiguration(): Promise<SequencerConfiguration> {
    return this.sequencerRepository.getConfiguration();
  }

  async updateInstrumentGrid(instrumentId: InstrumentId, trackIndex: number, stepIndex: number, newValue: boolean) {
    const sequencerConfiguration = await this.sequencerRepository.getConfiguration();
    const instrumentToUpdate = sequencerConfiguration.sequencerInstrumentStates.find(
      (i) => i.instrumentId === instrumentId,
    );
    instrumentToUpdate.tracks[trackIndex].steps[stepIndex].isOn = newValue;
    return this.sequencerRepository.saveConfiguration(sequencerConfiguration);
  }
}
