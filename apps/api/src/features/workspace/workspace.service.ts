import {
  ConflictException,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import {
  EntityManager,
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { Workspace } from './entities/workspace.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class WorkspaceService {
  constructor(
    /**
     * @description workspace repository injection
     */
    @InjectRepository(Workspace)
    private readonly workspaceRepository: EntityRepository<Workspace>,
    /**
     * @description entity manager
     */
    private readonly em: EntityManager,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspace = this.workspaceRepository.create(createWorkspaceDto);
      // if (createWorkspaceDto.slug) {
      //   workspace.slug = createWorkspaceDto.slug.trim().replaceAll(' ', '_');
      // } else {
      //   const slug = createWorkspaceDto.name
      //     .trim()
      //     .replaceAll(' ', '_')
      //     .slice(0, 3);
      //   workspace.slug = slug;
      // }
      await this.em.persistAndFlush(workspace);
      return {
        message: 'Workspace created successfully',
        data: workspace,
      };
    } catch (error) {
      Logger.log(error.message, 'WORKSPACE');
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException(`A workspace with this slug already exist`);
      }
      throw new RequestTimeoutException();
    }
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
