import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException, Logger } from '@nestjs/common';
import { HashingProvider } from 'src/utils/providers/hashing.provider';

export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    /**
     * @description hashing provider
     */
    private readonly hashingProvider: HashingProvider,
  ) {}

  async create(user: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    // Logger.debug(existingUser);
    if (existingUser) {
      throw new BadRequestException('User already exist');
    }
    try {
      const newUser = this.userRepository.create(user);
      newUser.password = await this.hashingProvider.hash(user.password);
      // return newUser;
      return await this.userRepository.save(newUser);
    } catch (error) {
      Logger.error(error, 'CreateUserProvider');
    }
  }
}
