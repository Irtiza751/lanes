import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'john doe', description: 'Username or Password' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '******' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
