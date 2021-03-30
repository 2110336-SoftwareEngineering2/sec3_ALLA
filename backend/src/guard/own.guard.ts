import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class OwnGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('Own Guard Activated');
    const req = context.switchToHttp().getRequest<Request>();
    let id = req.params.id ? Number(req.params.id) : null;
    id = req.body.id ? Number(req.body.id) : id;
    console.log('token id :',req.uid,'id :',id);
    return req.uid === id;
  }
}
