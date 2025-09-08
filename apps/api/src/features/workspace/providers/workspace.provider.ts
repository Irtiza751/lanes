import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Workspace } from '../entities/workspace.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class WorkspaceProvider {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: EntityRepository<Workspace>,
  ) {}

  async findBySlug(slug: string) {
    const result = await this.workspaceRepository
      .createQueryBuilder('w')
      .select('*')
      .where({ slug })
      .getSingleResult();

    return result;
  }
}
