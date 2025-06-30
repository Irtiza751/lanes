import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    name: 'logo_url'
  })
  logoUrl?: string;

  @ManyToOne(() => User, (user) => user.workspaces, { cascade: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
