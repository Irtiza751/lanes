import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { UserProvider } from 'src/users/providers/user.provider';
import { CreateTaskDto } from '../dto/create-task.dto';
import { JwtUserResponse } from 'src/auth/interfaces/jwt-user-response';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CreateTaskProvider {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userProvider: UserProvider,
  ) {}

  async create(createTaskDto: CreateTaskDto, reqUser: JwtUserResponse) {
    let user: User | null;
    let assignedUser: User | null = null;
    if (createTaskDto.assigneTo) {
      try {
        assignedUser = await this.userProvider.findById(
          createTaskDto.assigneTo,
        );
      } catch (error) {
        throw new RequestTimeoutException();
      }
      if (!assignedUser) throw new NotFoundException();
    }

    try {
      user = await this.userProvider.findById(reqUser.sub);
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (!user) throw new UnauthorizedException();

    const task = this.taskRepository.create({
      ...createTaskDto,
      creator: user,
      assigned: assignedUser,
    });

    return this.taskRepository.save(task);
  }
}
