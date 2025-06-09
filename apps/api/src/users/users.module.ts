import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
