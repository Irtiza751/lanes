import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as argon2 from 'argon2';

@Injectable()
export class ArgonProvider extends HashingProvider {
  async hash(data: string | Buffer): Promise<string> {
    return await argon2.hash(data);
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await argon2.verify(encrypted, data);
  }
}
