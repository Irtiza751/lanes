import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number; // user who created the task

  @IsNumber()
  @IsOptional()
  assigneTo?: number; // to whom this task is assigned to

  @IsDateString()
  @IsOptional()
  dueDate?: Date; // date by which this task should be completed
}
