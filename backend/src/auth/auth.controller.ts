import { Body, Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService, loginLayout } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() dto : loginLayout) {
    return this.service.login(dto);
  }

  @Get('email/send-verification/:id')
  public async sendEmailVerification(@Param('id', new ParseIntPipe()) id: number) {
    try {
      var isEmailSent = await this.service.sendEmailVerification(id);  
      if(isEmailSent){
        return true;
      } else {
        return false;
      }
    } catch(error) {
      console.log(error);
    }
  }

  @Get('email/verify/:token')
  public async verifyEmail(@Param('token') token : string) {
    return this.service.verifyEmail(token);
  }
}
