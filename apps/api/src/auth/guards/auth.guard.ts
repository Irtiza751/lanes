import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtProvider } from '../providers/jwt.provider';
import { Reflector } from '@nestjs/core';
import { AuthKeys } from '../constants/auth.keys';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtProvider: JwtProvider,
    // reflector to access metadata
    private readonly reflactor: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflactor.get<boolean | undefined>(
      AuthKeys.AUTH_PUBLIC_KEY,
      context.getHandler(),
    );

    Logger.log(`isPublic: ${isPublic}`, 'AuthGuard');
    if (isPublic) {
      return true;
    }

    const token = this.extractToken(request);
    // Logger.warn(token);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtProvider.varifyAccessToken(token);
      // Logger.warn(user);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request: Request): string | null {
    const header = request.headers['authorization'];
    return header?.split(' ')[1] || null;
  }
}
