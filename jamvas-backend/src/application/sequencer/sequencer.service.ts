import { Injectable } from '@nestjs/common';
import { SequencerRepository } from './sequencer.repository';
import { SequencerConfiguration } from '../../domain/sequencer-configuration';
import { InstrumentId } from '../../domain/instrument-id';
import { SessionGateway } from '../session/sessionGateway';

@Injectable()
export class SequencerService {
  constructor(private sequencerRepository: SequencerRepository, private sessionGateway: SessionGateway) {}

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
    this.sessionGateway.broadcastSequencerConfigurationUpdated(updatedConfiguration);
    return updatedConfiguration;
  }

  async updateBpm(bpm) {
    const sequencerConfiguration = await this.sequencerRepository.getConfiguration();
    sequencerConfiguration.bpm = bpm;

    const updatedConfiguration = await this.sequencerRepository.saveConfiguration(sequencerConfiguration);
    this.sessionGateway.broadcastSequencerConfigurationUpdated(updatedConfiguration);
    return updatedConfiguration;
  }
}
