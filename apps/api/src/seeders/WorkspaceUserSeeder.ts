import { WorkspaceUser } from '@/features/workspace/entities/workspace-user.entity';
import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class WorkspaceUserSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    em.create(WorkspaceUser, {
      role: context['role-1'],
      user: context['user-1'],
      workspace: context.workspace,
    });

    em.create(WorkspaceUser, {
      role: context['role-2'],
      user: context['user-2'],
      workspace: context.workspace,
    });
  }
}
