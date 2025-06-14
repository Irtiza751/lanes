import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './providers/auth.service';
import { Public } from './decrators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  public login(@Body() loginDto: LoginDto) {
    return this.authService.authenticate(loginDto);
  }
}
