import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
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
import { Project } from '../projects/entities/project.entity';

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

    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
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

    user = await this.userProvider.findById(session.sub);
    role = await this.roleService.findByName('admin');
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!role) {
      throw new UnauthorizedException();
    }
    Logger.log(user, 'WorkspaceService.create.user');
    Logger.log(role, 'WorkspaceService.create.role');

    try {
      const workspace = this.workspaceRepository.create(createWorkspaceDto);
      const workspaceUser = this.workspaceUserRepo.create({
        user,
        role,
        workspace,
      });
      const project = this.projectRepository.create({
        name: createWorkspaceDto.name,
        startDate: new Date(),
        targetDate: null,
        workspace: workspace,
      });

      // this.em.persist([workspace, workspaceUser]);
      await this.em.persistAndFlush([workspace, workspaceUser, project]);
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

  async join(session: JwtPayload, workspaceId: string) {
    let user: User | null = null;
    let role: Role | null = null;
    let workspace: Workspace | null = null;

    user = await this.userProvider.findById(session.sub);
    role = await this.roleService.findByName('developer');
    workspace = await this.workspaceRepository.findOne({ id: workspaceId });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!role) {
      throw new UnauthorizedException();
    }
    if (!workspace) {
      throw new NotFoundException(`Workspace with ${workspaceId} not found`);
    }

    try {
      const workspaceUser = this.workspaceUserRepo.create({
        user,
        role,
        workspace,
      });

      await this.em.persistAndFlush(workspaceUser);
      return {
        message: 'You have successfully joined the workspace',
        data: {
          id: workspaceUser.id,
          joinedAt: workspaceUser.joinedAt,
          workspace: workspaceUser.workspace,
        },
      };
    } catch (error) {
      Logger.log(error.message, 'WorkspaceService.joinWorkspace');
    }
  }
}
