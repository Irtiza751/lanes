import { Action } from '@/core/enums/action.enum';
import { Resource } from '@/core/enums/resource.enum';
import { Scope } from '@/core/enums/scope.enum';
import { Permission } from '@/core/interfaces/permission.interface';
import { Role } from '@/features/roles/entities/role.entity';

import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

type Roles = {
  name: string;
  description: string;
  permissions: Permission[];
}[];

export class RoleSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const roles: Roles = [
      {
        name: 'Super admin',
        description: 'Full system access',
        permissions: [
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
        ],
      },
      {
        name: 'Developer',
        description: 'Basic user access',
        permissions: [
          {
            resource: Resource.WORKSPACE,
            action: Action.READ,
            scope: Scope.OWN,
          },
        ],
      },
      {
        name: 'Developer',
        description: 'Basic user access',
        permissions: [
          {
            resource: Resource.WORKSPACE,
            action: Action.READ,
            scope: Scope.ASSIGNED,
          },
        ],
      },
    ];

    roles.forEach((role, i) => {
      const newRole = {
        ...role,
        permissions: JSON.stringify(role.permissions),
      };
      context[`role-${i + 1}`] = em.create(Role, newRole);
    });
  }
}
