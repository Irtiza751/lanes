import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Res,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from '@core/decorators/public.decorator';
import { SigninDto } from './dto/signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { RefreshDto } from './dto/refresh.dto';
import { GeneratedTokens } from '@core/interfaces/generated-tokens.interface';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';
import { User } from '@/core/decorators/user.decorator';
import { JwtPayload } from '@/core/interfaces/jwt-payload.interface';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '@/utils/cookie-options';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @Public()
  signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.createUser(createUserDto, res);
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @Public()
  signIn(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInUser(signinDto, res);
  }

  @Post('/refresh')
  @Public()
  refreshTokens(@Body() refreshDto: RefreshDto): Promise<GeneratedTokens> {
    return this.authService.refreshTokens(refreshDto);
  }

  @Post('/forgot-password')
  @Public()
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/reset-password/:token')
  @Public()
  resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }

  @Get('/verify-email/:token')
  @ApiBearerAuth('access_token')
  verifyUser(@Param('token') token: string) {
    // return req.user;
    return this.authService.verifyUserEmail(token);
  }

  @Get('/whoami')
  @ApiBearerAuth('access_token')
  whoami(@User() user: JwtPayload): { user: JwtPayload } {
    return {
      user,
    };
  }

  @Post('/signout')
  @ApiBearerAuth('access_token')
  @ApiCookieAuth('access_token')
  signOut(@Res({ passthrough: true }) res: Response) {
    Logger.log('Signing out user, clearing cookies', 'AuthController');
    res.clearCookie('access_token', accessTokenCookieOptions);
    res.clearCookie('refresh_token', refreshTokenCookieOptions);
    return { message: 'Signed out successfully' };
  }
}
