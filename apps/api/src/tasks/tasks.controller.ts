import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RequestUser } from 'src/auth/interfaces/request-user';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: RequestUser) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  findAll(@Request() req: RequestUser) {
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestUser) {
    return this.tasksService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req: RequestUser) {
    return this.tasksService.update(+id, updateTaskDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestUser) {
    return this.tasksService.remove(+id, req.user);
  }
}
