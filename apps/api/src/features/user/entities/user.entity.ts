import {
  BeforeCreate,
  BeforeUpdate,
  Cascade,
  Collection,
  Entity,
  Enum,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { AuthProvider } from '../enums/auth-provider';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from '@/core/classes/base-entity';
import { WorkspaceUser } from '@/features/workspace/entities/workspace-user.entity';
import { Project } from '@/features/projects/entities/project.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  @ApiProperty({ example: 'john_doe' })
  name: string;

  @Property()
  @Unique()
  @ApiProperty({ example: 'abc@xyz.com' })
  email: string;

  @Property({ hidden: true, nullable: true })
  password?: string;

  @Enum(() => AuthProvider)
  @ApiProperty({ enum: AuthProvider, example: AuthProvider.LOCAL })
  provider: AuthProvider;

  @Property({ nullable: true })
  @ApiProperty({ example: 'google-id-123' })
  providerId?: string;

  @Property({ type: 'boolean', nullable: true, default: false })
  @ApiProperty({ example: false })
  verified?: boolean;

  @Property({ nullable: true })
  @ApiProperty({ example: 'profile-picture.jpg' })
  avatar?: string;

  @Property({ type: 'boolean', default: true, nullable: true })
  @ApiProperty({ example: true })
  isActive?: boolean;

  @OneToMany(() => WorkspaceUser, (wu) => wu.user, {
    cascade: [Cascade.REMOVE],
  })
  workspaceUsers = new Collection<WorkspaceUser>(this);

  @OneToMany(() => Project, (project) => project.lead, {
    cascade: [Cascade.REMOVE],
  })
  projects = new Collection<Project>(this);

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
  }
}
