export interface Signin {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  sub: string;
  name: string;
  role: string;
  email: string;
}
