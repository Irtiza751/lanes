import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtUserResponse } from 'src/auth/interfaces/jwt-user-response';
import { CreateTaskProvider } from './providers/create-task.provider';
import { SuccessResponse } from 'src/utils/classes/success-response';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly createTaskProvider: CreateTaskProvider,
  ) {}

  async create(createTaskDto: CreateTaskDto, reqUser: JwtUserResponse) {
    return this.createTaskProvider.create(createTaskDto, reqUser);
  }

  findAll(reqUser: JwtUserResponse) {
    return this.taskRepository.find({
      where: { creator: { id: reqUser.sub } },
    });
  }

  findOne(id: number, reqUser: JwtUserResponse) {
    return this.taskRepository.findOne({
      where: { creator: { id: reqUser.sub } },
    });
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    reqUser: JwtUserResponse,
  ) {
    const result = await this.taskRepository.update(
      { id, creator: { id: reqUser.sub } },
      updateTaskDto,
    );
    if (!result.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return new SuccessResponse(`Project with id ${id} updated successfully`);
  }

  async remove(id: number, reqUser: JwtUserResponse) {
    const result = await this.taskRepository.delete({
      id,
      creator: { id: reqUser.sub },
    });
    if (!result.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    throw new SuccessResponse(`Task with id ${id} deleted successfully`);
  }
}
