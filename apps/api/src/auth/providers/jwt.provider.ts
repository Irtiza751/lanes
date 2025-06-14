import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { JwtUserPayload } from '../interfaces/jwt-user-payload';

@Injectable()
export class JwtProvider {
  constructor(
    private readonly jwtService: JwtService,
    /**
     * @description
     * inject jwt config service
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigService: ConfigType<typeof jwtConfig>,
  ) {}

  public generateAccessToken(payload: JwtUserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfigService.secret,
      issuer: this.jwtConfigService.jwtIssuer,
      expiresIn: this.jwtConfigService.jwtAccessTtl,
    });
  }

  public generateRefreshToken(payload: JwtUserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfigService.jwtRefreshSecret,
      issuer: this.jwtConfigService.jwtIssuer,
      expiresIn: this.jwtConfigService.jwtRefreshTtl,
    });
  }

  public varifyToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.jwtConfigService.secret,
    });
  }
}
