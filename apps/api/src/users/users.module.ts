import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { UtilsModule } from 'src/utils/utils.module';
import { UserProvider } from './providers/user.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, UserProvider],
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
  exports: [UserProvider],
})
export class UsersModule {}
