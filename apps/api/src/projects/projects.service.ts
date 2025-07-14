import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/utils/classes/success-response';
import { CreateProjectProvider } from './providers/create-project.provider';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { UpdateProjectProvider } from './providers/update-project.provider';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    private readonly createProjectProvider: CreateProjectProvider,

    private readonly updateProjectProvider: UpdateProjectProvider,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.createProjectProvider.create(createProjectDto);
  }

  findAll(userId: number, workspaceId?: number) {
    if (!workspaceId) {
      return this.projectRepository.find({
        where: { creator: { id: userId } },
      });
    }
    return this.projectRepository.find({
      where: { creator: { id: userId }, workspace: { id: workspaceId } },
    });
  }

  findOne(id: number) {
    return this.projectRepository.findOne({ where: { id } });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    Logger.log(updateProjectDto.workspaceId, 'workspace id');
    return this.updateProjectProvider.update(id, updateProjectDto);
  }

  async remove(id: number, userId: number) {
    const result = await this.projectRepository.delete({
      creator: { id: userId },
      id,
    });
    if (!result.affected) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    throw new SuccessResponse(`Project with id ${id} deleted successfully`);
  }
}
