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
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { WorkspaceProvider } from 'src/workspace/providers/workspace.provider';

@Injectable()
export class CreateProjectProvider {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    private readonly workspaceProvider: WorkspaceProvider,
    private readonly userProvider: UserProvider,
  ) {}

  public async create(createProjectDto: CreateProjectDto) {
    let user: User | null = null;
    let workspace: Workspace | null = null;
    const {creatorId, workspaceId} = createProjectDto;

    try {
      user = await this.userProvider.findById(createProjectDto.creatorId);
      workspace = await this.workspaceProvider.findById(createProjectDto.workspaceId);
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (!user) throw new NotFoundException(`User with id: ${creatorId} not found`);
    if (!workspace) throw new NotFoundException(`Workspace with id: ${workspaceId} not found`);

    const project = this.projectRepository.create({
      ...createProjectDto,
      creator: user,
      workspace: workspace
    });
    try {
      await this.projectRepository.save(project);
    } catch (error) {
      throw new RequestTimeoutException();
    }
    const {workspace: data, creator, ...rest} = project;
    return rest;
  }
}
