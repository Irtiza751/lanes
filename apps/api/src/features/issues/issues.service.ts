import {
  BadRequestException,
  Injectable,
  Logger,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Issue } from './entities/issue.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserProvider } from '../user/providers/user-provider';
import { ProjectsService } from '../projects/projects.service';
import { JwtPayload } from '@/core/interfaces/jwt-payload.interface';
import { User } from '../user/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { StatusWorkflow } from './entities/status-workflows';

@Injectable()
export class IssuesService {
  constructor(
    /**
     * @description issue repository
     */
    @InjectRepository(Issue)
    private readonly issueRepository: EntityRepository<Issue>,
    /**
     * @description Injecting the EntityManager for advanced database operations
     */
    private readonly em: EntityManager,

    private readonly userProvider: UserProvider,

    private readonly projectService: ProjectsService,

    @InjectRepository(StatusWorkflow)
    private readonly statusWorkflowRepo: EntityRepository<StatusWorkflow>,
  ) {}

  async create(user: JwtPayload, createIssueDto: CreateIssueDto) {
    let creator: User | null = null;
    let project: Project | null = null;
    let assignee: User | null = null;
    let status: StatusWorkflow | null = null;

    creator = await this.userProvider.findById(user.sub);
    project = await this.projectService.findOneByKey(createIssueDto.projectKey);
    status = await this.statusWorkflowRepo.findOne({
      id: createIssueDto.status,
    });

    if (createIssueDto.assigneeId) {
      assignee = await this.userProvider.findById(createIssueDto.assigneeId);
    }

    if (!creator) {
      throw new UnauthorizedException();
    }

    if (createIssueDto.assigneeId && !assignee) {
      throw new BadRequestException('Invalid assignee id');
    }

    if (!project) {
      throw new BadRequestException('Invalid project key');
    }

    if (!status) {
      throw new BadRequestException('Invalid status id');
    }

    try {
      let issueKey: string = `${project.key}-${project.issues.count() + 1}`;

      const issue = this.issueRepository.create({
        key: issueKey,
        ...createIssueDto,
        project,
        creator,
        assignee,
        status,
      });

      this.em.persistAndFlush(issue);
      return {
        message: 'Issue created successfully',
        data: issue,
      };
    } catch (error) {
      Logger.debug(error.message, 'IssueService');
      throw new RequestTimeoutException();
    }
  }

  findAll() {
    return `This action returns all issues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} issue`;
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return `This action updates a #${id} issue`;
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }
}
