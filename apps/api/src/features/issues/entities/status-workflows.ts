import { BaseEntity } from '@/core/classes/base-entity';
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { WorkflowCategory } from '../enums/workflow-category.enum';
import { Project } from '@/features/projects/entities/project.entity';
import { Issue } from './issue.entity';

@Entity()
export class StatusWorkflow extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true, default: 'black' })
  color: string;

  @Enum({
    items: () => WorkflowCategory,
    default: WorkflowCategory.BACKLOG,
    nullable: true,
  })
  category?: WorkflowCategory;

  @ManyToOne(() => Project, { nullable: true })
  project?: Project;

  @OneToMany(() => Issue, (issue) => issue.status)
  issues = new Collection<Issue>(this);

  @Property({ nullable: true })
  sortOrder: number;

  @Property({ nullable: true })
  isDefault: boolean;
}
