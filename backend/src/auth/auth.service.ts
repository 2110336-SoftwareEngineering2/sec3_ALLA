import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import * as nodemailer from 'nodemailer';

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

  async sendEmailVerification(id : number) : Promise<boolean> {
    const user = await this.userService.findById(id);
    if (!user) return false;
    const user_email = user.email;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nisiter.system@gmail.com', // your email
        pass: 'Nisiter123' // your email password
      }
    })
    const token = this.jwtService.sign({ uid: user.id });
    let mailOptions = {
      from: 'Company <nisiter.system@gmail.com>', 
      to: user_email, // list of receivers (separated by ,)
      subject: 'Verify Email', 
      text: 'Verify Email', 
      html: 'Hi! <br><br> Thanks for your registration<br><br>'+
      '<a href='+ 'http://localhost:8300/auth/email/verify/'+ token + '>Click here to activate your account</a>'  // html body
    };
    console.log('before sending');
    var sent = await new Promise<boolean>(async function(resolve, reject) {
      return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {      
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
      });      
    })
    return sent;

  }

  async verifyEmail(token : string) {
    const {uid} = this.verifyToken(token);
    console.log(uid);   
    const ret = await this.userService.verifyUser(uid);
    return {
      id : ret.id,
      verified : ret.verified
    }
  }
  
}