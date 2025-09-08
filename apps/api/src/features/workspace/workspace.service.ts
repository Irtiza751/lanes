import {
  ConflictException,
  Injectable,
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
    // workspace provider
    private readonly workspaceProvider: WorkspaceProvider,
    // user provider
    private readonly userProvider: UserProvider,
  ) {}

  async create(session: JwtPayload, createWorkspaceDto: CreateWorkspaceDto) {
    let user: User | null;
    try {
      user = await this.userProvider.findById(session.sub);
      if (!user) {
        throw new UnprocessableEntityException();
      }
    } catch (error) {
      throw new RequestTimeoutException();
    }

    try {
      const workspace = this.workspaceRepository.create({
        ...createWorkspaceDto,
        owner: user,
      });
      await this.em.persistAndFlush(workspace);
      return {
        message: 'Workspace created successfully',
        data: workspace,
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
