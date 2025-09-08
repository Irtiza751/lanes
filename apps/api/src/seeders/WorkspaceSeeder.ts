import { Workspace } from '@/features/workspace/entities/workspace.entity';
import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class WorkspaceSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.workspace = em.create(Workspace, {
      name: 'Waredrop',
      slug: 'waredrop',
      owner: context['user-1'],
    });
  }
}
