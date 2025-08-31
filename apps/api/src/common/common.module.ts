import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from '@/features/roles/entities/role.entity';
import { WorkspaceUser } from '@/features/workspace/entities/workspace-user.entity';

@Module({
  providers: [PermissionService],
  imports: [MikroOrmModule.forFeature([Role, WorkspaceUser])],
  exports: [PermissionService],
})
export class CommonModule {}
