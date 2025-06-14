import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UserProvider } from 'src/users/providers/user.provider';
import { HashingProvider } from 'src/utils/providers/hashing.provider';
import { JwtProvider } from './jwt.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtProvider: JwtProvider,
  ) {}

  public async authenticate(loginDto: LoginDto) {
    const user = await this.userProvider.findByEmail(loginDto.email);
    // find the user by email if exist
    if (!user) {
      throw new NotFoundException('Incorrect email or password');
    }
    // validate the password
    const isValid = await this.hashingProvider.compare(
      loginDto.password,
      user.password,
    );
    // check if the password is valid
    if (!isValid) {
      throw new NotFoundException('Incorrect email or password');
    }

    const jwtPayload = { sub: user.id, email: user.email };
    const token = await this.jwtProvider.generateAccessToken(jwtPayload);
    const refreshToken =
      await this.jwtProvider.generateRefreshToken(jwtPayload);

    const data = { ...user, token, refreshToken };

    const response: Partial<typeof data> = data;
    // remove the password from the reponse.
    delete response.password;
    return response;
  }
}
