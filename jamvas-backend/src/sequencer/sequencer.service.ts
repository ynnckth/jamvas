import { Injectable } from '@nestjs/common';
import { SequencerRepository } from './sequencer.repository';
import { SequencerConfiguration } from './sequencer-configuration';

@Injectable()
export class SequencerService {
  constructor(private sequencerRepository: SequencerRepository) {}

  getConfiguration(): Promise<SequencerConfiguration> {
    return this.sequencerRepository.getConfiguration();
  }
}
