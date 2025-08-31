import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './UserSeeder';
import { RoleSeeder } from './RoleSeeder';
import { WorkspaceSeeder } from './WorkspaceSeeder';
import { WorkspaceUserSeeder } from './WorkspaceUserSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      UserSeeder,
      RoleSeeder,
      WorkspaceSeeder,
      WorkspaceUserSeeder,
    ]);
  }
}
