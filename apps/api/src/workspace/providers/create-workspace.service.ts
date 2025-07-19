import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from '../entities/workspace.entity';
import { Repository } from 'typeorm';
import { UserProvider } from 'src/users/providers/user.provider';
import { User } from 'src/users/entities/user.entity';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { DuplicateException } from 'src/filters/postgres-exception/duplicate-exception';
import { PostgresErrorCode } from 'src/filters/postgres-exception/postgres-error-codes';

@Injectable()
export class CreateWorkspaceService {
  constructor(
    private readonly userProvider: UserProvider,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  public async create(createWorkspaceDto: CreateWorkspaceDto) {
    let user: User | null = null;
    try {
      user = await this.userProvider.findById(createWorkspaceDto.ownerId);
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (!user) throw new NotFoundException();

    const workspace = this.workspaceRepository.create({
      ...createWorkspaceDto,
      owner: user,
    });

    try {
      await this.workspaceRepository.save(workspace);
    } catch (error) {
      if (error.code === PostgresErrorCode.PG_UNIQUE_VIOLATION) {
        throw new DuplicateException('Workspace with this name already exists');
      }
      throw new RequestTimeoutException();
    }
    return workspace;
  }
}
