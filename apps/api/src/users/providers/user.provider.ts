import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  public findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  public findById(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }
}
