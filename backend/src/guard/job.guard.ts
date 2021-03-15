import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JobService } from 'src/job/job.service';

@Injectable()
export class JobGuard implements CanActivate {
  constructor(
    @Inject('JobService') private readonly jobService: JobService,
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log('Job Guard Activated');
    const req = context.switchToHttp().getRequest<Request>();
    const jid = req.params.jid ? Number(req.params.jid) : null;
    const id = await this.jobService.findJobOwner(jid);
    console.log('job owner id:',id);
    console.log('job id:', jid);
    return req.uid === id;
  }
}
