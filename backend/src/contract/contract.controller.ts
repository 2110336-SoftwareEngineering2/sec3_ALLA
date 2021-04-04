import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards,} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { Contract } from 'src/entities/contract.entity';
import { ContractService } from './contract.service';
import { CreateContractGuard } from 'src/guard/createContract.guard';
import { ContractGuard } from 'src/guard/contract.guard';


@Controller('contract')
export class ContractController {
    
    constructor(private readonly service: ContractService) {}

    @UseGuards(AuthGuard)
    @Get(':cid')
    findById(@Param('cid', new ParseIntPipe()) cid: number): {} {
        return this.service.findById(cid);
    }

    @Post()
    @UseGuards(CreateContractGuard)
    create(@Body() dto: Omit<Contract, 'cid'>): {} {
        return this.service.create(dto);
    }


    @Post('navigate/:cid')
    @UseGuards(ContractGuard)
    navigate(@Param('cid', new ParseIntPipe()) cid: number, @Body() dto: any) {
        return this.service.navigate(cid, dto);
    }

/*
    @Patch(':cid')
    update(@Param('cid', new ParseIntPipe()) cid: number, @Body() dto: {}): {} {
        return this.service.update(cid, dto);
    }
*/


    @Delete(':cid')
    delete(@Param('cid', new ParseIntPipe()) cid: number): {} {
        return this.service.delete(cid);
    } 
}
