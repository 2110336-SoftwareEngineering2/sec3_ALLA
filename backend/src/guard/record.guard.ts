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
export class RecordGuard implements CanActivate {
  constructor(
    @Inject('ApplicationRecordService')
    private readonly applicationRecordService: ApplicationRecordService,
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log('Record Guard Activated');
    const req = context.switchToHttp().getRequest<Request>();
    if (!req.uid || !req.params.rid) return false;
    const id = req.uid;
    const rid = Number(req.params.rid);
    const idObj = await this.applicationRecordService.getAssociatedId(rid);
    const record = await this.applicationRecordService.findById(rid);

    console.log('id :',id);
    console.log('Associated id',idObj);

    if (record.state == StateNum.APPLY) return id == idObj.eid;
    if (record.state == StateNum.OFFER) return id == idObj.sid;
    if (record.state == StateNum.CONFIRM) return id == idObj.eid;
  }
}
