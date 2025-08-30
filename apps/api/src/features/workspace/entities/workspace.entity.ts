import { BaseEntity } from '@/core/classes/base-entity';
import { Role } from '@/features/roles/entities/role.entity';
import { User } from '@/features/user/entities/user.entity';
import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { WorkspaceUser } from './workspace-user.entity';

@Entity()
export class Workspace extends BaseEntity<'settings' | 'description'> {
  @Property()
  name: string;

  @Property({ unique: true })
  slug: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  settings?: string;

  @BeforeCreate()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.slug.toUpperCase();
  }
}
