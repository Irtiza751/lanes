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
        name: 'admin',
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
        ],
      },
      {
        name: 'developer',
        description: 'Basic permissions',
        permissions: [
          {
            resource: Resource.WORKSPACE,
            action: Action.READ,
            scope: Scope.OWN,
          },
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
