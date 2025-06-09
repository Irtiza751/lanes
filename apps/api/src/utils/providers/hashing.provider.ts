import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  abstract compare(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;

  abstract hash(data: string | Buffer): Promise<string>;
}