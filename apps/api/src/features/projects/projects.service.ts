import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  EntityManager,
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceProvider } from '@features/workspace/providers/workspace.provider';
import { UserProvider } from '../user/providers/user-provider';
import { User } from '../user/entities/user.entity';
import { Workspace } from '../workspace/entities/workspace.entity';

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
    /**
     * @description inject user repository
     */
    private readonly userProvider: UserProvider,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    let user: User | null = null;
    let workspace: Workspace | null = null;

    try {
      workspace = await this.workspaceProvider.findBySlug(
        createProjectDto.workspace,
      );
      if (!workspace) {
        throw new UnprocessableEntityException('Incorrect workspace slug');
      }
      if (createProjectDto.lead) {
        user = await this.userProvider.findById(createProjectDto.lead);
      }
    } catch (error) {
      throw new RequestTimeoutException();
    }

    try {
      const project = this.projectRepository.create({
        ...createProjectDto,
        lead: user,
        workspace,
      });

      await this.em.persistAndFlush(project);
      return {
        message: 'Project created successfully',
        project,
      };
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException(
          'project with this key or name already exist',
        );
      }
      throw new RequestTimeoutException();
    }
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return this.projectRepository
      .createQueryBuilder('p')
      .select('*')
      .where({ id })
      .getSingleResult();
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  findWorkspaceProjects(slug: string) {
    return this.projectRepository
      .createQueryBuilder('p')
      .select(['name', 'key', 'id'])
      .where({ workspace: { slug } })
      .getResultList();
  }

  findOneByKey(key: string) {
    return this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.issues', 'i')
      .where({ key })
      .getSingleResult();
  }
}
