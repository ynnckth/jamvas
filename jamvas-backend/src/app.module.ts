import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { UsersRepository } from './user/users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class AppModule {}
