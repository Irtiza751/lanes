import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Workspace } from './entities/workspace.entity';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [MikroOrmModule.forFeature([Workspace])],
})
export class WorkspaceModule {}
