import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsOptional()
  @IsNumber()
  creatorId?: number;

  @IsNotEmpty()
  @IsNumber()
  workspaceId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
