import { BaseEntity } from '@/core/classes/base-entity';
import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
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

  @OneToMany(() => WorkspaceUser, (wu) => wu.workspace)
  workspaceUsers = new Collection<WorkspaceUser>(this);

  @BeforeCreate()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.slug.toUpperCase();
  }
}
