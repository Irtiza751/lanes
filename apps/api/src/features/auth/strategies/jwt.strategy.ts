import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { JwtPayload } from '@core/interfaces/jwt-payload.interface';
import { Request } from 'express';

/**
 * @description
 * The JWT strategy is used to validate jwt tokens
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    /**
     * @description inject auth service to validate the user
     */
    private readonly authService: AuthService,
    /**
     * @description inject jwt config service to get secerets
     */
    @Inject(jwtConfig.KEY)
    jwtConfigService: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // first try to extract from cookie
        (req: Request) => req.cookies?.access_token,
        // fallback to standard method
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.jwtAccessSecret!,
      issuer: jwtConfigService.jwtIssuer!,
      audience: jwtConfigService.jwtAudience!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
    // Logger.log(payload, 'JwtStrategy');
    const user = await this.authService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      sub: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
