import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DuplicateException } from 'src/filters/postgres-exception/duplicate-exception';
import { PostgresErrorCode } from 'src/filters/postgres-exception/postgres-error-codes';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspace = this.workspaceRepository.create({
        ...createWorkspaceDto,
        owner: { id: createWorkspaceDto.ownerId },
      });
      return await this.workspaceRepository.save(workspace);
    } catch (error) {
      if (error.code === PostgresErrorCode.PG_UNIQUE_VIOLATION) {
        throw new DuplicateException('Workspace with this name already exists');
      }
    }
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
