import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceUser } from './entities/workspace-user.entity';
import { CommonModule } from '@/common/common.module';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [
    MikroOrmModule.forFeature([WorkspaceUser, Workspace]),
    CommonModule,
  ],
})
export class WorkspaceModule {}
