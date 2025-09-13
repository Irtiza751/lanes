import { BaseEntity } from '@/core/classes/base-entity';
import { Entity, Enum, Property } from '@mikro-orm/core';
import { Priority } from '../enums/priority.enum';

interface Label {
  name: string;
  value: string;
}

@Entity()
export class Issue extends BaseEntity {
  @Property()
  title: string;

  @Property({ nullable: true })
  description?: string;

  @Enum({ items: () => Priority, default: Priority.MEDIUM })
  priority: Priority;

  @Property({ type: 'jsonb', nullable: true })
  labels?: Label[];

  @Property({ default: 0 })
  storyPoints: number;

  @Property({ type: 'timestamptz', nullable: true })
  completedAt?: Date;
}
