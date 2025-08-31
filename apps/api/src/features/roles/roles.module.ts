import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';

@Module({
  providers: [RoleService],
  imports: [MikroOrmModule.forFeature([Role])],
})
export class RolesModule {}
