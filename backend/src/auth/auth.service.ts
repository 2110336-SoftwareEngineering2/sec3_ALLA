import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

export interface loginLayout {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: loginLayout) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Invalid username/password');
    }
    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new BadRequestException('Invalid username/password');
    }
    const token = this.jwtService.sign({ uid: user.id });
    return {
      id: user.id,
      token: token,
    };
  }

  verifyToken(token: string): { uid: number } {
    const res = this.jwtService.verify<{ uid: number }>(token);
    return res;
  }
}
