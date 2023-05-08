import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IllegalArgumentException } from '../exception/IllegalArgumentException';
import { SessionGateway } from '../session/sessionGateway';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository, private sessionGateway: SessionGateway) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAll();
  }

  async registerNewUser(newUser: Omit<User, 'id'>): Promise<User> {
    if (!newUser.name) {
      throw new IllegalArgumentException('Username cannot be empty');
    }
    const allUsers = await this.usersRepository.getAll();
    if (allUsers.some((user) => user.name === newUser.name)) {
      throw new IllegalArgumentException('Username already exists');
    }
    const createdUser = await this.usersRepository.create(newUser);
    const updatedUsers = await this.usersRepository.getAll();
    this.sessionGateway.broadcastSessionUsersUpdated(updatedUsers);
    return createdUser;
  }

  async deleteUser(userId: string) {
    await this.usersRepository.deleteUser(userId);
  }
}
