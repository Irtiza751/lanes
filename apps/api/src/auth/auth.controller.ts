import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './providers/auth.service';
import { Public } from './decrators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @Public()
  public login(@Body() loginDto: LoginDto) {
    return this.authService.authenticate(loginDto);
  }

  @Post('/signup')
  @Public()
  public register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
