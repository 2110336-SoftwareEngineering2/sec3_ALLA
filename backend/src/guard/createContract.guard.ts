import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ContractService } from "src/contract/contract.service";
import { Request } from 'express';
import { read } from 'node:fs';
import { ApplicationRecordService } from 'src/application-record/application-record.service';
import { StateNum } from 'src/entities/applicationRecord.entity';
import { JobService } from 'src/job/job.service';

@Injectable()
export class CreateContractGuard implements CanActivate {
    constructor(
        @Inject('ContractService')
        private readonly contractService: ContractService,
    ) {}

    async canActivate(context: ExecutionContext) {
        console.log('Create Contract Guard Activated');
        const req = context.switchToHttp().getRequest<Request>();
        if (!req.uid || !req.body.eid) return false;
        const id = Number(req.body.eid);
        console.log('token id :', req.uid,'eid :',id)
        return req.uid === id;
      }
}
