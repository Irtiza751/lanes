import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/utils/classes/success-response';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create({
      ...createProjectDto,
      creator: createProjectDto.creatorId,
      workspace: { id: createProjectDto.workspaceId },
    });
    // return 'This action adds a new project';
    return this.projectRepository.save(project);
  }

  findAll(userId: number) {
    return this.projectRepository.find({ where: { creator: userId } });
  }

  findOne(id: number) {
    return this.projectRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.update(id, updateProjectDto);
    if (!project.affected) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    throw new SuccessResponse(`Project with id ${id} updated successfully`);
  }

  async remove(id: number, userId: number) {
    const result = await this.projectRepository.delete({ creator: userId, id });
    if (!result.affected) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    throw new SuccessResponse(`Project with id ${id} deleted successfully`);
  }
}
