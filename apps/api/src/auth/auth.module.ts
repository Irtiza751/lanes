import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { UtilsModule } from 'src/utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { JwtProvider } from './providers/jwt.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtProvider],
  imports: [
    UsersModule,
    UtilsModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
