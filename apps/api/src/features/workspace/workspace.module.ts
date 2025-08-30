import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceUser } from './entities/workspace-user.entity';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [MikroOrmModule.forFeature([WorkspaceUser, Workspace])],
})
export class WorkspaceModule {}
