import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { RequestUser } from 'src/auth/interfaces/request-user';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req: RequestUser) {
    createProjectDto.creatorId = req.user.sub;
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Request() req: RequestUser) {
    return this.projectsService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestUser) {
    return this.projectsService.remove(+id, req.user.sub);
  }
}
