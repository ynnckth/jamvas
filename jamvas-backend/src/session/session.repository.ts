import { Injectable } from '@nestjs/common';
import { SessionUser } from './SessionUser';

@Injectable()
export class SessionRepository {
  private usersInSession: SessionUser[] = [];

  getSessionUser(socketClientId: string) {
    return this.usersInSession.find((u) => u.socketClientId === socketClientId);
  }

  addUserToSession(sessionUser: SessionUser) {
    this.usersInSession.push(sessionUser);
  }

  removeUserFromSession(userId: string) {
    this.usersInSession = this.usersInSession.filter((u) => u.userId !== userId);
  }
}
