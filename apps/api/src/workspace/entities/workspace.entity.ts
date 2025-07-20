import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    default: null,
  })
  description?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    default: null,
  })
  logoUrl?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 12,
    unique: false,
    default: '#522fefff', // Default color
  })
  color?: string;

  @ManyToOne(() => User, (user) => user.workspaces)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Project, (project) => project.workspace, { cascade: true })
  @JoinColumn()
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
