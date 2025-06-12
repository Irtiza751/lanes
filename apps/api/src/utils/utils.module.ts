import { Module } from '@nestjs/common';
import { HashingProvider } from './providers/hashing.provider';
import { ArgonProvider } from './providers/argon.provider';

@Module({
  providers: [
    {
      provide: HashingProvider,
      useClass: ArgonProvider,
    },
  ],

  exports: [HashingProvider],
})
export class UtilsModule {}
