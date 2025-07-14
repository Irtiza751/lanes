import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { CreateWorkspaceService } from './providers/create-workspace.service';
import { UsersModule } from 'src/users/users.module';
import { WorkspaceProvider } from './providers/workspace.provider';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, CreateWorkspaceService, WorkspaceProvider],
  imports: [TypeOrmModule.forFeature([Workspace]), UsersModule],
  exports: [WorkspaceProvider],
})
export class WorkspaceModule {}
