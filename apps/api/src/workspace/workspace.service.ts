import { Injectable } from '@nestjs/common';
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
    private readonly workspaceRepository: Repository<Workspace>
  ) { }

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspace = this.workspaceRepository.create({
        ...createWorkspaceDto,
        owner: { id: createWorkspaceDto.ownerId }
      });
      return await this.workspaceRepository.save(workspace);
    } catch (error) {
      if (error.code === PostgresErrorCode.PG_UNIQUE_VIOLATION) {
        throw new DuplicateException('Workspace with this name already exists');
      }
    }
  }

  findAll() {
    return this.workspaceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} workspace`;
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
