import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Waredrop',
    description: 'Name of your workspace',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'WAR',
    description:
      'slug of your workspace, will be auto generated if not provided',
  })
  slug: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Waredrop workspace to manage waredrop teams and projects,',
  })
  description: string;

  @IsOptional()
  @IsJSON()
  @ApiProperty({
    example: JSON.stringify({
      theme: 'dark',
      cycles: 'enabled',
    }),
    description: 'Json settings of the workspace',
  })
  settings?: string;
}
