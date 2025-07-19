import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersModule } from 'src/users/users.module';
import { CreateProjectProvider } from './providers/create-project.provider';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { UpdateProjectProvider } from './providers/update-project.provider';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, CreateProjectProvider, UpdateProjectProvider],
  imports: [TypeOrmModule.forFeature([Project]), UsersModule, WorkspaceModule],
})
export class ProjectsModule {}
