import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (existingUser) return new BadRequestException('User already exist');
      const newUser = this.userRepository.create(user);

      return this.userRepository.save(user);
    } catch (error) {}
  }
}
