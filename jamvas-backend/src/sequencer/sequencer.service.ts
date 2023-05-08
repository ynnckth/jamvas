import { Injectable } from '@nestjs/common';
import { SequencerRepository } from './sequencer.repository';
import { SequencerConfiguration } from './sequencer-configuration';
import { InstrumentId } from './instrument-id';
import { SequencerGateway } from './sequencer.gateway';

@Injectable()
export class SequencerService {
  constructor(private sequencerRepository: SequencerRepository, private sequencerGateway: SequencerGateway) {}

  getConfiguration(): Promise<SequencerConfiguration> {
    return this.sequencerRepository.getConfiguration();
  }

  async updateInstrumentGrid(instrumentId: InstrumentId, trackIndex: number, stepIndex: number, newValue: boolean) {
    const sequencerConfiguration = await this.sequencerRepository.getConfiguration();
    const instrumentToUpdate = sequencerConfiguration.sequencerInstrumentStates.find(
      (i) => i.instrumentId === instrumentId,
    );
    instrumentToUpdate.tracks[trackIndex].steps[stepIndex].isOn = newValue;

    const updatedConfiguration = await this.sequencerRepository.saveConfiguration(sequencerConfiguration);
    this.sequencerGateway.broadcastSequencerConfigurationUpdate(updatedConfiguration);
    return updatedConfiguration;
  }

  async updateBpm(bpm) {
    const sequencerConfiguration = await this.sequencerRepository.getConfiguration();
    sequencerConfiguration.bpm = bpm;

    const updatedConfiguration = await this.sequencerRepository.saveConfiguration(sequencerConfiguration);
    this.sequencerGateway.broadcastSequencerConfigurationUpdate(updatedConfiguration);
    return updatedConfiguration;
  }
}
