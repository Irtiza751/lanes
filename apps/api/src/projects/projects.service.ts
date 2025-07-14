import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/utils/classes/success-response';
import { CreateProjectProvider } from './providers/create-project.provider';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    private readonly createProjectProvider: CreateProjectProvider,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.createProjectProvider.create(createProjectDto);
  }

  findAll(userId: number) {
    return this.projectRepository.find({ where: { creator: { id: userId } } });
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
