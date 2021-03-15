import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('Auth Guard Activated');
    const req = context.switchToHttp().getRequest<Request>();
    return req.uid !== undefined;
  }
}
