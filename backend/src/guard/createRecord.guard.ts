import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { read } from 'node:fs';
import { ApplicationRecordService } from 'src/application-record/application-record.service';
import { StateNum } from 'src/entities/applicationRecord.entity';
import { JobService } from 'src/job/job.service';

@Injectable()
export class CreateRecordGuard implements CanActivate {
  constructor(
    @Inject('ApplicationRecordService')
    private readonly applicationRecordService: ApplicationRecordService,
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log('Record Guard Activated');
    const req = context.switchToHttp().getRequest<Request>();
    if (!req.uid || !req.body.sid) return false;
    const id = Number(req.body.sid);
    console.log('token id :', req.uid,'sid :',id)
    return req.uid === id;
  }
}
