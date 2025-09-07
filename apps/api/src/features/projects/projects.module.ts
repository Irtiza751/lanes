import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './entities/project.entity';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [MikroOrmModule.forFeature([Project])],
})
export class ProjectsModule {}
