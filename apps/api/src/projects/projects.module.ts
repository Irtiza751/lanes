import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project]), UsersModule],
})
export class ProjectsModule {}
