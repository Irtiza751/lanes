import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  description?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    default: null,
  })
  image?: string;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  @JoinColumn()
  creator: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
