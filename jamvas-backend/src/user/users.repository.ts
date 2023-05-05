import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class UsersRepository {
  private registeredUsers: User[] = [];

  async getAll(): Promise<User[]> {
    return this.registeredUsers;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user, id: v4() };
    this.registeredUsers.push(newUser);
    return newUser;
  }
}
