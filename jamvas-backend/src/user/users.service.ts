import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IllegalArgumentException } from '../exception/IllegalArgumentException';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAll();
  }

  registerNewUser(newUser: Omit<User, 'id'>): Promise<User> {
    if (!newUser.name) {
      throw new IllegalArgumentException('Username cannot be empty');
    }
    return this.usersRepository.create(newUser);
  }
}
