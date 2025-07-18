import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UsersModule } from 'src/users/users.module';
import { CreateTaskProvider } from './providers/create-task.provider';

@Module({
  controllers: [TasksController],
  providers: [TasksService, CreateTaskProvider],
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
})
export class TasksModule {}
