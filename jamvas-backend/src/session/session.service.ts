import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { SessionUser } from './SessionUser';
import { UsersRepository } from '../user/users.repository';

@Injectable()
export class SessionService {
  constructor(private sessionRepository: SessionRepository, private usersRepository: UsersRepository) {}

  getSessionUser(socketClientId: string) {
    return this.sessionRepository.getSessionUser(socketClientId);
  }

  async removeUserFromSession(userId: string) {
    this.sessionRepository.removeUserFromSession(userId);
    await this.usersRepository.deleteUser(userId);
  }

  addUserToSession(sessionUser: SessionUser) {
    this.sessionRepository.addUserToSession(sessionUser);
  }
}
