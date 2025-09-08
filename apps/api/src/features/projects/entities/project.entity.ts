import { BaseEntity } from '@/core/classes/base-entity';
import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  Enum,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { ProjectStatus } from '../enums/project-status.enum';
import { Workspace } from '@/features/workspace/entities/workspace.entity';
import { User } from '@/features/user/entities/user.entity';

@Entity()
export class Project extends BaseEntity<'workspace' | 'key'> {
  @Property({ unique: true })
  name: string;

  @Property({ unique: true })
  key: string;

  @Property({ nullable: true })
  description?: string;

  @Enum({ items: () => ProjectStatus, default: ProjectStatus.ACTIVE })
  status?: ProjectStatus;

  @Property({ type: 'jsonb', nullable: true })
  settings?: string;

  @Property({ type: 'timestamptz' })
  startDate: Date;

  @Property({ type: 'timestamptz' })
  targetDate: Date;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @ManyToOne(() => User, { nullable: true })
  lead?: User;

  @BeforeCreate()
  @BeforeUpdate()
  generateKey() {
    this.key = this.name.trim().toUpperCase().slice(0, 3);
  }
}
