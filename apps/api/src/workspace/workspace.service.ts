import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>
  ) {}

  create(createWorkspaceDto: CreateWorkspaceDto) {
    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    return this.workspaceRepository.save(workspace);
  }

  findAll() {
    return `This action returns all workspace`;
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
