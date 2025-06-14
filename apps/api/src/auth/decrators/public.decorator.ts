import { SetMetadata } from '@nestjs/common';
import { AuthKeys } from '../constants/auth.keys';

export const Public = () => SetMetadata(AuthKeys.AUTH_PUBLIC_KEY, true);
