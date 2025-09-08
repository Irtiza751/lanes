import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  RequestTimeoutException,
  UnprocessableEntityException,
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
import { WorkspaceProvider } from './providers/workspace.provider';
import { JwtPayload } from '@/core/interfaces/jwt-payload.interface';
import { User } from '../user/entities/user.entity';
import { UserProvider } from '../user/providers/user-provider';
import { WorkspaceUser } from './entities/workspace-user.entity';
import { Role } from '../roles/entities/role.entity';
import { RoleService } from '../roles/services/role.service';

@Injectable()
export class WorkspaceService {
  constructor(
    /**
     * @description workspace repository injection
     */
    @InjectRepository(Workspace)
    private readonly workspaceRepository: EntityRepository<Workspace>,
    /**
     * @description workspace users repository
     */
    @InjectRepository(WorkspaceUser)
    private readonly workspaceUserRepo: EntityRepository<WorkspaceUser>,
    /**
     * @description entity manager
     */
    private readonly em: EntityManager,
    // workspace provider
    private readonly workspaceProvider: WorkspaceProvider,
    // user provider
    private readonly userProvider: UserProvider,
    // role service
    private readonly roleService: RoleService,
  ) {}

  async create(session: JwtPayload, createWorkspaceDto: CreateWorkspaceDto) {
    let user: User | null = null;
    let role: Role | null = null;

    try {
      user = await this.userProvider.findById(session.sub);
      role = await this.roleService.findByName('admin');
      if (!user) {
        throw new UnprocessableEntityException();
      }
      if (!role) {
        throw new InternalServerErrorException();
      }
      Logger.log(user, 'WorkspaceService.create.user');
      Logger.log(role, 'WorkspaceService.create.role');
    } catch (error) {
      throw new RequestTimeoutException();
    }

    try {
      const workspace = this.workspaceRepository.create(createWorkspaceDto);
      const workspaceUser = this.workspaceUserRepo.create({
        user,
        role,
        workspace,
      });

      // this.em.persist([workspace, workspaceUser]);
      await this.em.persistAndFlush([workspace, workspaceUser]);
      return {
        message: 'Workspace created successfully',
        data: {
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
          description: workspace.description,
          settings: workspace.settings,
        },
      };
    } catch (error) {
      Logger.log(error.message, 'WORKSPACE');
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException(`A workspace with this URL already exist`);
      }
      throw new RequestTimeoutException();
    }
  }

  findAll(user: JwtPayload) {
    return this.workspaceProvider.getUserWorkspaces(user.sub);
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
