import { BaseEntity } from '@/core/classes/base-entity';
import { WorkspaceUser } from '@/features/workspace/entities/workspace-user.entity';
import { Workspace } from '@/features/workspace/entities/workspace.entity';
import {
  BeforeCreate,
  BeforeUpdate,
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Role extends BaseEntity {
  @Property({ unique: true })
  name: string;

  @Property({ type: 'jsonb' })
  permissions: string;

  @Property({ nullable: true })
  description: string;

  @OneToMany(() => WorkspaceUser, (wu) => wu.role)
  assignment = new Collection<WorkspaceUser>(this);

  @BeforeCreate()
  @BeforeUpdate()
  snakeCaseName() {
    this.name = this.name.replaceAll(' ', '_').toLowerCase();
  }
}
