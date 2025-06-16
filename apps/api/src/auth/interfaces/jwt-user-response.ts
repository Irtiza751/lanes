import { JwtUserPayload } from './jwt-user-payload';

export interface JwtUserResponse extends JwtUserPayload {
  iat: number;
  exp: number;
  iss: string;
}
