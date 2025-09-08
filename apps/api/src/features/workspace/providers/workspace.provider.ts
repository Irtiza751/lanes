import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { Workspace } from '../entities/workspace.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceUser } from '../entities/workspace-user.entity';

@Injectable()
export class WorkspaceProvider {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: EntityRepository<Workspace>,
    /**
     * @description workspace user repository
     */
    @InjectRepository(WorkspaceUser)
    private readonly workspaceUserRepo: EntityRepository<WorkspaceUser>,
  ) {}

  async findBySlug(slug: string) {
    const result = await this.workspaceRepository
      .createQueryBuilder('w')
      .select('*')
      .where({ slug })
      .getSingleResult();

    return result;
  }

  /**
   * @description returns the list of workspaces user is member of.
   * @param userId of logged in user
   * @returns Workspace
   */
  async getUserWorkspaces(userId: string) {
    const result = await this.workspaceUserRepo
      .createQueryBuilder('wu')
      .joinAndSelect('wu.user', 'u')
      .joinAndSelect('wu.workspace', 'w')
      .where({ user: { id: userId } })
      .orWhere({ workspace: { owner: userId } })
      .getResultList();

    return result.map((item) => ({
      id: item.id,
      joinedAt: item.joinedAt,
      workspace: {
        id: item.workspace.id,
        name: item.workspace.name,
        slug: item.workspace.slug,
      },
    }));
  }
}
