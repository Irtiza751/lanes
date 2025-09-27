import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { UserModule } from '../user/user.module';
import { ProjectsModule } from '../projects/projects.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Issue } from './entities/issue.entity';
import { StatusWorkflow } from './entities/status-workflows';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [
    MikroOrmModule.forFeature([Issue, StatusWorkflow]),
    UserModule,
    ProjectsModule,
  ],
})
export class IssuesModule {}
