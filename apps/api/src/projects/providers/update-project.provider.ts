import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { UserProvider } from 'src/users/providers/user.provider';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { WorkspaceProvider } from 'src/workspace/providers/workspace.provider';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { SuccessResponse } from 'src/utils/classes/success-response';

@Injectable()
export class UpdateProjectProvider {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    private readonly workspaceProvider: WorkspaceProvider,
    private readonly userProvider: UserProvider,
  ) {}

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { workspaceId, creatorId, ...updateData } = updateProjectDto;
    let user: User | null = null;
    let workspace: Workspace | null = null;

    if (creatorId) {
      try {
        user = await this.userProvider.findById(creatorId);
      } catch (error) {
        throw new RequestTimeoutException();
      }
      if (!user)
        throw new NotFoundException(`User with id ${creatorId} not found`);
    }

    if (workspaceId) {
      try {
        workspace = await this.workspaceProvider.findById(workspaceId);
      } catch (error) {
        throw new RequestTimeoutException();
      }
      if (!workspace)
        throw new NotFoundException(
          `Workspace with id ${workspaceId} not found`,
        );
    }

    const project = await this.projectRepository.update(id, {
      ...updateData,
      ...(user ? { creator: user } : {}),
      ...(workspace ? { workspace: workspace } : {}),
    });
    if (!project.affected) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    throw new SuccessResponse(`Project with id ${id} updated successfully`);
  }
}
