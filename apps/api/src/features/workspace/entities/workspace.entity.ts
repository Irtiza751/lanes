import { BaseEntity } from '@/core/classes/base-entity';
import { BeforeCreate, BeforeUpdate, Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'workspaces' })
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
