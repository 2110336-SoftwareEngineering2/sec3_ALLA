import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ContractService } from "src/contract/contract.service";
import { ContractStatus } from "src/entities/contract.entity";
import { Request } from 'express';

@Injectable()
export class ContractGuard implements CanActivate {
    constructor(
        @Inject('ContractService')
        private readonly contractService: ContractService,
    ) {}

    async canActivate(context: ExecutionContext){
        console.log('Contract Guard Activated');
        const req = context.switchToHttp().getRequest<Request>();
        if (!req.uid || !req.params.cid) return false;
        const id = req.uid;
        const cid = Number(req.params.cid);
        const idObj = await this.contractService.getAssociatedId(cid);
        const con = await this.contractService.findById(cid);

        console.log('id :',id);
        console.log('Associated id',idObj);
        
        if (con.status == ContractStatus.DOING) return id == idObj.sid;
        if (con.status == ContractStatus.SUBMITTED || 
            con.status == ContractStatus.RESIGN_REQ) return id == idObj.eid;
    }
}
