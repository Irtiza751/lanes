import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { UserProvider } from 'src/users/providers/user.provider';
import { CreateProjectDto } from '../dto/create-project.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CreateProjectProvider {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    private readonly userProvider: UserProvider,
  ) {}

  public async create(createProjectDto: CreateProjectDto) {
    let user: User | null = null;

    try {
      user = await this.userProvider.findById(createProjectDto.creatorId);
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (!user) throw new NotFoundException();

    const project = this.projectRepository.create({
      ...createProjectDto,
      creator: user,
    });
    try {
      await this.projectRepository.save(project);
    } catch (error) {
      throw new RequestTimeoutException();
    }
    return project;
  }
}
