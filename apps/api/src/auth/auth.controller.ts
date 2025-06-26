import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './providers/auth.service';
import { Public } from './decrators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtUserResponse } from './interfaces/jwt-user-response';
import { RequestUser } from './interfaces/request-user';

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

  @Get('/whoami')
  public getLogedInUser(@Request() req: RequestUser) {
    const user: JwtUserResponse = req.user;
    return this.authService.findUserById(user.sub);
  }
}
