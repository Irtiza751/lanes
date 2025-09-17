import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { UserModule } from '../user/user.module';
import { ProjectsModule } from '../projects/projects.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Issue } from './entities/issue.entity';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [MikroOrmModule.forFeature([Issue]), UserModule, ProjectsModule],
})
export class IssuesModule {}
