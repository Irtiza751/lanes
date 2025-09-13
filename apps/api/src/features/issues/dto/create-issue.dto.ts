import {
  IsDate,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Label } from '../entities/issue.entity';
import { Priority } from '../enums/priority.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateIssueDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'title',
    description: 'Title of the issue',
    example: 'Signing in with google is not working',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'description',
    description: 'Description of the issue',
    example:
      'While pressing the signin with google button the page is getting freeze',
  })
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  @ApiProperty({
    name: 'priority',
    description: 'By default all issues have medium priority',
    example: 'low',
  })
  priority?: Priority;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'projectKey',
    description: 'All issues must belong to one project',
    example: 'TMS',
  })
  projectKey: string; // should be project key

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    name: 'creatorId',
    description: 'Id of the user who created this issue',
  })
  creatorId: string; // user id who created the issue

  @IsJSON()
  @IsOptional()
  @ApiProperty({
    name: 'labels',
    description: 'Labels describe what sort issue is this e.g (good first)',
    example: '[{"name": "Good first", "value": "good-first"}]',
  })
  labels?: Label[];

  @IsNumber()
  @IsOptional()
  storyPoints?: number = 0;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    name: 'completedAt',
    description: 'When a issue was completed',
    example: new Date().toDateString(),
  })
  completedAt?: Date;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    name: 'assigneeId',
    description: 'To whom an issue is assigned to',
    example: 'some-user-id',
  })
  assigneeId?: string;
}
