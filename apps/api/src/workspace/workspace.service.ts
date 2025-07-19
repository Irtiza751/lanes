import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWorkspaceService } from './providers/create-workspace.service';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,

    private readonly createWorkspaceProvider: CreateWorkspaceService,
  ) {}

  create(createWorkspaceDto: CreateWorkspaceDto) {
    return this.createWorkspaceProvider.create(createWorkspaceDto);
  }

  findAll(ownerId: number) {
    return this.workspaceRepository.find({ where: { owner: { id: ownerId } } });
  }

  findOne(id: number) {
    return this.workspaceRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    const result = await this.workspaceRepository.update(
      id,
      updateWorkspaceDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }
    return { success: true, message: 'Workspace updated successfully' };
  }

  async remove(id: number) {
    const result = await this.workspaceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }
    return { success: true, message: 'Workspace deleted successfully' };
  }
}
