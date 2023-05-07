import { Controller, Get, Logger } from '@nestjs/common';
import { SequencerService } from './sequencer.service';
import { SequencerConfiguration } from './sequencer-configuration';

@Controller('sequencer')
export class SequencerController {
  private readonly logger = new Logger(SequencerController.name);

  constructor(private sequencerService: SequencerService) {}

  @Get()
  async getConfiguration(): Promise<SequencerConfiguration> {
    this.logger.log('Requested sequencer configuration');
    return this.sequencerService.getConfiguration();
  }
}
