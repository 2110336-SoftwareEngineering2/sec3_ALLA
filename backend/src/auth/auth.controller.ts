import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, loginLayout } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() dto : loginLayout) {
    return this.service.login(dto);
  }
}
