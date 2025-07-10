import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';
import envSchema from './config/env.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dbConfig, jwtConfig],
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('db.port'),
        username: configService.get('db.user'),
        password: configService.get('db.password'),
        host: configService.get('db.host'),
        database: configService.get('db.name'),
        autoLoadEntities: configService.get('db.autoLoadEntities'),
        synchronize: configService.get('db.synchronize'),
      }),
    }),
    UtilsModule,
    AuthModule,
    WorkspaceModule,
    TasksModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
