import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { User } from '@/core/decorators/user.decorator';
import { JwtPayload } from '@/core/interfaces/jwt-payload.interface';

@ApiBearerAuth('access_token')
@ApiCookieAuth('access_token')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@User() user: JwtPayload, @Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(user, createIssueDto);
  }

  @Get(':projectId')
  findAll(@Param('projectId') projectId: string) {
    return this.issuesService.findAll(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.remove(+id);
  }
}
