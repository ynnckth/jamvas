import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { UsersRepository } from './user/users.repository';
import { SequencerGateway } from './sequencer/sequencer.gateway';
import { SequencerController } from './sequencer/sequencer.controller';
import { SequencerService } from './sequencer/sequencer.service';
import { SequencerRepository } from './sequencer/sequencer.repository';

@Module({
  imports: [],
  controllers: [UsersController, SequencerController],
  providers: [
    UsersService,
    UsersRepository,
    SequencerGateway,
    SequencerService,
    SequencerRepository,
  ],
})
export class AppModule {}
