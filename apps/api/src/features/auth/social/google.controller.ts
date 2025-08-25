import {
  Controller,
  Get,
  Logger,
  Inject,
  UseGuards,
  Res,
} from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { Public } from '@core/decorators/public.decorator';
import { User } from '@core/decorators/user.decorator';
import { SocialUser } from '@core/interfaces/social-user';
import { GoogleProvider } from '../provider/google-provider';
import { ConfigType } from '@nestjs/config';
import appConfig from '@config/app.config';
import { Response } from 'express';

@Public()
@Controller('auth/google')
export class GoogleController {
  constructor(
    private readonly googleProvider: GoogleProvider,

    /**
     * @description app config
     */
    @Inject(appConfig.KEY)
    private readonly appConfigService: ConfigType<typeof appConfig>,
  ) {}

  /**
   * @description
   * this will redirect the user to the google's auth page
   */
  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  /**
   * @description once successfully authenticated google will callback this endpoint
   * @param user object with user email, profile etc...
   */
  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@User() user: SocialUser, @Res() res: Response) {
    Logger.log(user, 'google user');
    const result = await this.googleProvider.validateOrCreateUser(user, res);
    const frontendUrl = this.appConfigService.frontendUrl;
    // `http://localhost:5173/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`
    const redirectUrl = `${frontendUrl}/google?accessToken=${result.accessToken}&refreshToken=${result.refreshToken}`;
    return res.redirect(redirectUrl);
  }
}
