import { BaseEntity } from '@/core/classes/base-entity';
import {
  BeforeCreate,
  BeforeUpdate,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { WorkspaceUser } from './workspace-user.entity';
import { Project } from '@/features/projects/entities/project.entity';

@Entity()
export class Workspace extends BaseEntity<'slug'> {
  @Property()
  name: string;

  @Property({ unique: true })
  slug: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  settings?: string;

  @OneToMany(() => WorkspaceUser, (wu) => wu.workspace, {
    cascade: [Cascade.REMOVE],
  })
  workspaceUsers = new Collection<WorkspaceUser>(this);

  @OneToMany(() => WorkspaceUser, (project) => project.workspace, {
    cascade: [Cascade.REMOVE],
  })
  projects = new Collection<Project>(this);

  @BeforeCreate()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.slug?.toLowerCase();
  }
}
