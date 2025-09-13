import { BaseEntity } from '@/core/classes/base-entity';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Priority } from '../enums/priority.enum';
import { Project } from '@/features/projects/entities/project.entity';
import { User } from '@/features/user/entities/user.entity';

@Entity()
export class Issue extends BaseEntity {
  @Property({ unique: true })
  key: string;

  @Property()
  title: string;

  @Property({ nullable: true })
  description?: string;

  @Enum({ items: () => Priority, default: Priority.MEDIUM })
  priority?: Priority;

  @Property({ type: 'jsonb', nullable: true })
  labels?: string[];

  @Property({ default: 0 })
  storyPoints?: number;

  @Property({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @ManyToOne(() => Project)
  project: Project;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => User, { nullable: true })
  assignee?: User;
}
