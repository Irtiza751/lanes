import { Action } from '@/core/enums/action.enum';
import { Resource } from '@/core/enums/resource.enum';
import { Scope } from '@/core/enums/scope.enum';
import { Role } from '@/features/roles/entities/role.entity';

import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class RoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const roles = [
      {
        name: 'Super admin',
        description: 'Full system access',
        permissions: JSON.stringify([
          {
            resource: Resource.WORKSPACE,
            action: Action.MANAGE,
            scope: Scope.ALL,
          },
          {
            resource: Resource.PROJECT,
            action: Action.MANAGE,
            scope: Scope.ALL,
          },
          { resource: Resource.ISSUE, action: Action.MANAGE, scope: Scope.ALL },
          { resource: Resource.CYCLE, action: Action.MANAGE, scope: Scope.ALL },
          {
            resource: Resource.ROADMAP,
            action: Action.MANAGE,
            scope: Scope.ALL,
          },
          { resource: Resource.USER, action: Action.MANAGE, scope: Scope.ALL },
          {
            resource: Resource.INTEGRATION,
            action: Action.MANAGE,
            scope: Scope.ALL,
          },
          {
            resource: Resource.AUDIT_LOG,
            action: Action.READ,
            scope: Scope.ALL,
          },
          {
            resource: Resource.ANALYTICS,
            action: Action.READ,
            scope: Scope.ALL,
          },
        ]),
      },
    ];

    for (let role of roles) {
      em.create(Role, role);
    }
  }
}
