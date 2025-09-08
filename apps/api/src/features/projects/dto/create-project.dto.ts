import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  key?: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date; // starting date of the project

  @IsDate()
  @IsNotEmpty()
  targetDate: Date; // estimated completion date

  @IsString()
  @IsNotEmpty()
  workspace: string; // slug of the workspace

  @IsUUID()
  @IsOptional()
  lead?: string;
}
