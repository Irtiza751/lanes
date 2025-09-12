import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './entities/project.entity';
import { WorkspaceModule } from '@features/workspace/workspace.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [MikroOrmModule.forFeature([Project]), WorkspaceModule, UserModule],
})
export class ProjectsModule {}
