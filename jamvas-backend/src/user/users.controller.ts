import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async registerUser(@Body() newUser: Omit<User, 'id'>): Promise<User> {
    this.logger.log(`Registering new user with name ${newUser.name}`);
    const registeredUser = await this.usersService.registerNewUser(newUser);
    this.logger.log(`Successfully registered new user ${registeredUser.id}`);
    return registeredUser;
  }
}
