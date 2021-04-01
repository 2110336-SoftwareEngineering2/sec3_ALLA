/*
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ContractService } from "src/contract/contract.service";

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
*/