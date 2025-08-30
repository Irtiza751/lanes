import { BaseEntity } from '@/core/classes/base-entity';
import { BeforeCreate, BeforeUpdate, Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'roles' })
export class Role extends BaseEntity {
  @Property({ unique: true })
  name: string;

  @Property({ type: 'jsonb' })
  permissions: string;

  @BeforeCreate()
  @BeforeUpdate()
  snakeCaseName() {
    this.name = this.name.replaceAll(' ', '_').toLowerCase();
  }
}
