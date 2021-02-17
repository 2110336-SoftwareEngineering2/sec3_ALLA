import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

export interface loginLayout {
  username : string
  password : string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: loginLayout) {
    console.log('login : ' +username+password)
    const user = await this.userService.findByUsername(username);
    console.log('user : ' + user)
    if (!user) {
      console.log('login : user not found')
      throw new BadRequestException('Invalid username/password');
    }
    const isValid = await compare(password, user.password);
    console.log('pw : ' + password + ' ' + user.password);
    if (!isValid) {
      console.log('login : password is not valid');
      throw new BadRequestException('Invalid username/password');
    }
    return this.jwtService.sign({ uid: user.id }); 
  }

  verifyToken(token: string): { uid: number } {
    const res = this.jwtService.verify<{ uid: number }>(token);
    return res;
  }
}
