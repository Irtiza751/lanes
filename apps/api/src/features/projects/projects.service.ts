import {
  Injectable,
  Logger,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceProvider } from '@features/workspace/providers/workspace.provider';

@Injectable()
export class ProjectsService {
  constructor(
    /**
     * @description inject the project repository
     */
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    /**
     * @description inject entity manager
     */
    private readonly em: EntityManager,
    /**
     * @description inject workspace provider
     */
    private readonly workspaceProvider: WorkspaceProvider,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const workspace = await this.workspaceProvider.findBySlug(
        createProjectDto.workspace,
      );
      if (!workspace) {
        throw new UnprocessableEntityException('Incorrect workspace slug');
      }
      const project = this.projectRepository.create({
        ...createProjectDto,
        workspace,
      });

      await this.em.persistAndFlush(project);
      return {
        message: 'Project created successfully',
        project,
      };
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
