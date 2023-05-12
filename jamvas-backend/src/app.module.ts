import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { UsersRepository } from './user/users.repository';
import { SessionGateway } from './session/sessionGateway';
import { SequencerController } from './sequencer/sequencer.controller';
import { SequencerService } from './sequencer/sequencer.service';
import { SequencerRepository } from './sequencer/sequencer.repository';
import { SessionRepository } from './session/session.repository';
import { SessionService } from './session/session.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, SequencerController],
  providers: [
    UsersService,
    UsersRepository,
    SequencerService,
    SequencerRepository,
    SessionService,
    SessionGateway,
    SessionRepository,
  ],
})
export class AppModule {}
