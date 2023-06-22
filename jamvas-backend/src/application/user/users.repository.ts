import { Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);

  private registeredUsers: User[] = [];

  async getAll(): Promise<User[]> {
    return this.registeredUsers;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    this.logger.log(`Creating user: ${user.name}`);
    const newUser = { ...user, id: v4() };
    this.registeredUsers.push(newUser);
    return newUser;
  }

  async deleteUser(userId: string): Promise<void> {
    this.logger.log(`Deleting user: ${userId}`);
    this.registeredUsers = this.registeredUsers.filter((u) => u.id !== userId);
  }
}
