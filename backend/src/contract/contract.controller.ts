import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Contract } from 'src/entities/contract.entity';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
    
    constructor(private readonly service: ContractService) {}

    //@UseGuards(AuthGuard)
    @Get(':cid')
    findById(@Param('cid', new ParseIntPipe()) cid: number): {} {
        return this.service.findById(cid);
    }

    @Post()
    create(@Body() dto: Omit<Contract, 'cid'>): {} {
        return this.service.create(dto);
    }

    //@UseGuards(OwnGuard)
    @Patch(':cid')
    update(@Param('cid', new ParseIntPipe()) cid: number, @Body() dto: {}): {} {
        return this.service.update(cid, dto);
    }
    
    //@UseGuards(OwnGuard)
    @Delete(':cid')
    delete(@Param('cid', new ParseIntPipe()) cid: number): {} {
        return this.service.delete(cid);
    } 
}
