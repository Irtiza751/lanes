import { AuthProvider } from '@/features/user/enums/auth-provider';
import { Roles } from '@/core/enums/roles.enum';

export interface SocialUser {
  provider: AuthProvider;
  providerId: string;
  email: string;
  name: string;
  avatar: string;
  verified: boolean;
  role: Roles;
  accessToken: string;
}
