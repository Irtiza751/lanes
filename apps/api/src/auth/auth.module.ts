import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { UtilsModule } from 'src/utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { JwtProvider } from './providers/jwt.provider';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtProvider,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  imports: [
    UsersModule,
    UtilsModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
