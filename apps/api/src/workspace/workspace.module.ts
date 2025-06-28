import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [
    TypeOrmModule.forFeature([Workspace])
  ]
})
export class WorkspaceModule {}
