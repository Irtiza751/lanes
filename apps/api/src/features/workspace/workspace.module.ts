import { forwardRef, Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceUser } from './entities/workspace-user.entity';
import { CommonModule } from '@/common/common.module';
import { WorkspaceProvider } from './providers/workspace.provider';
import { UserModule } from '../user/user.module';
import { RolesModule } from '../roles/roles.module';
import { Project } from '../projects/entities/project.entity';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceProvider],
  imports: [
    MikroOrmModule.forFeature([WorkspaceUser, Workspace, Project]),
    CommonModule,
    forwardRef(() => UserModule),
    RolesModule,
  ],
  exports: [WorkspaceProvider],
})
export class WorkspaceModule {}
