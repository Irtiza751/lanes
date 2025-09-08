import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { RequiredPermission } from '@/core/decorators/required-permission.decorator';
import { Resource } from '@/core/enums/resource.enum';
import { Action } from '@/core/enums/action.enum';
import { User } from '@/core/decorators/user.decorator';
import { JwtPayload } from '@/core/interfaces/jwt-payload.interface';

@ApiCookieAuth('access_token')
@ApiBearerAuth('access_token')
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(
    @User() user: JwtPayload,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspaceService.create(user, createWorkspaceDto);
  }

  @Get()
  findAll(@User() user: JwtPayload) {
    return this.workspaceService.findAll(user);
  }

  @RequiredPermission(Resource.WORKSPACE, Action.READ)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOne(+id);
  }

  @RequiredPermission(Resource.WORKSPACE, Action.UPDATE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(+id, updateWorkspaceDto);
  }

  @RequiredPermission(Resource.WORKSPACE, Action.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceService.remove(+id);
  }
}
