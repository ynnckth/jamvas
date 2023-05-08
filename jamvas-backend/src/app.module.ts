import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { UsersRepository } from './user/users.repository';
import { SessionGateway } from './sequencer/sessionGateway';
import { SequencerController } from './sequencer/sequencer.controller';
import { SequencerService } from './sequencer/sequencer.service';
import { SequencerRepository } from './sequencer/sequencer.repository';

@Module({
  imports: [],
  controllers: [UsersController, SequencerController],
  providers: [UsersService, UsersRepository, SessionGateway, SequencerService, SequencerRepository],
})
export class AppModule {}
