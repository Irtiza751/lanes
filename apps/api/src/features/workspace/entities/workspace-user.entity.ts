import { Role } from '@/features/roles/entities/role.entity';
import { User } from '@/features/user/entities/user.entity';
import {
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Workspace } from './workspace.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'workspace_users' })
export class WorkspaceUser {
  [OptionalProps]?: 'joinedAt';

  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @Property({ type: 'timestamptz' })
  joinedAt: Date = new Date();
}
