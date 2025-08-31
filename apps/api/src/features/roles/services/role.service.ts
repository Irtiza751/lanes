import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    /**
     * @description role repository injection
     */
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    /**
     * @description Injecting the EntityManager for advanced database operations
     */
    private readonly em: EntityManager,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      await this.em.persistAndFlush(role);
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
