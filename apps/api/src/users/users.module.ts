import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider],
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
})
export class UsersModule {}
