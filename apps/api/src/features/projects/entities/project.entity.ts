import { BaseEntity } from '@/core/classes/base-entity';
import {
  BeforeCreate,
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ProjectStatus } from '../enums/project-status.enum';
import { Workspace } from '@/features/workspace/entities/workspace.entity';
import { User } from '@/features/user/entities/user.entity';
import { Issue } from '@/features/issues/entities/issue.entity';

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

  @OneToMany(() => Issue, (issue) => issue.project, {
    cascade: [Cascade.REMOVE],
  })
  issues = new Collection<Issue>(this);

  @BeforeCreate()
  generateKey() {
    if (this.key) {
      this.key = this.key.trim().toUpperCase();
    } else {
      this.key = this.name.trim().toUpperCase().slice(0, 3);
    }
  }
}
