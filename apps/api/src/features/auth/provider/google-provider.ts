import { Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { UserService } from '@/features/user/user.service';

import { SocialUser } from '@core/interfaces/social-user';
import { UserProvider } from '@features/user/providers/user-provider';
import { AuthService } from '../auth.service';
import { Response } from 'express';
import { accessTokenCookieOptions } from '@/utils/cookie-options';

@Injectable()
export class GoogleProvider {
  constructor(
    /**
     * @description user service
     */
    private readonly userService: UserService,
    /**
     * @description user provider to create social user
     */
    private readonly userProvider: UserProvider,

    private readonly authService: AuthService,
  ) {}

  async validateOrCreateUser(googleUser: SocialUser, res: Response) {
    const { email } = googleUser;
    const user = await this.userService.findByEmail(email);
    try {
      if (user) {
        await this.userService.update(user.id, googleUser);
        const tokens = await this.authService.generateTokens({
          sub: user.id,
          email: user.email,
          name: user.name,
        });

        res.cookie(
          'access_token',
          tokens.accessToken,
          accessTokenCookieOptions,
        );

        res.cookie(
          'refresh_token',
          tokens.accessToken,
          accessTokenCookieOptions,
        );

        return { user, ...tokens };
      } else {
        const { socialUser } =
          await this.userProvider.createSocialUser(googleUser);
        const tokens = await this.authService.generateTokens({
          sub: socialUser.id,
          email: socialUser.email,
          name: socialUser.name,
        });
        res.cookie(
          'access_token',
          tokens.accessToken,
          accessTokenCookieOptions,
        );
        res.cookie(
          'refresh_token',
          tokens.accessToken,
          accessTokenCookieOptions,
        );
        return { user: socialUser, ...tokens };
      }
    } catch (error) {
      throw new RequestTimeoutException(error.message);
    }
  }
}
