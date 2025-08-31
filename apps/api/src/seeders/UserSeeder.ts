import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { AuthProvider } from '@/features/user/enums/auth-provider';
import { User } from '@/features/user/entities/user.entity';

export class UserSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const users = [
      {
        email: 'john.doe@example.com',
        name: 'john doe',
        password: 'password123',
        // roles: [context.adminRole, context.userRole],
        provider: AuthProvider.LOCAL,
        isEmailVerified: true,
      },
      {
        email: 'jane.doe@example.com',
        name: 'jane doe',
        password: 'password123',
        // roles: [context.userRole],
        provider: AuthProvider.LOCAL,
        isEmailVerified: false,
      },
    ];

    users.forEach((userData, i) => {
      context[`user-${i + 1}`] = em.create(User, userData);
    });
  }
}
