import { Body, Controller, Get, Logger, Put } from '@nestjs/common';
import { SequencerService } from './sequencer.service';
import { SequencerConfiguration } from './sequencer-configuration';
import { UpdateInstrumentGridRequest } from './dto/update-instrument-grid.request';

@Controller('sequencer')
export class SequencerController {
  private readonly logger = new Logger(SequencerController.name);

  constructor(private sequencerService: SequencerService) {}

  @Get()
  async getConfiguration(): Promise<SequencerConfiguration> {
    this.logger.log('Requested sequencer configuration');
    return this.sequencerService.getConfiguration();
  }

  @Put('grid')
  async updateInstrumentGrid(@Body() request: UpdateInstrumentGridRequest): Promise<SequencerConfiguration> {
    this.logger.log(
      `Updating sequencer configuration for instrument ${request.instrumentId}: Setting tracks[${request.trackIndex}].steps[${request.stepIndex}] = ${request.newValue}`,
    );
    // TODO: broadcast updated sequencer configuration to all users via websocket
    return this.sequencerService.updateInstrumentGrid(
      request.instrumentId,
      request.trackIndex,
      request.stepIndex,
      request.newValue,
    );
  }
}
