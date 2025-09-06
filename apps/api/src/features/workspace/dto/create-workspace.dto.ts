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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'waredrop',
    description: 'slug or url of your workspace, it must be unique',
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
