import { Module } from '@nestjs/common';
import { UsersController } from './application/user/users.controller';
import { UsersService } from './application/user/users.service';
import { UsersRepository } from './application/user/users.repository';
import { SessionGateway } from './application/session/sessionGateway';
import { SequencerController } from './application/sequencer/sequencer.controller';
import { SequencerService } from './application/sequencer/sequencer.service';
import { SequencerRepository } from './application/sequencer/sequencer.repository';
import { SessionRepository } from './application/session/session.repository';
import { SessionService } from './application/session/session.service';
import { AppController } from './application/app.controller';

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
