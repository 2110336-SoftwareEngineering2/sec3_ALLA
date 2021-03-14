import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { JobContract } from 'src/entities/jobcontract.entity';
import { JobcontractService } from './jobcontract.service';

@Controller('jobcontract')
export class JobcontractController {
    
    constructor(private readonly service: JobcontractService) {}

    //@UseGuards(AuthGuard)
    @Get(':cid')
    findById(@Param('cid', new ParseIntPipe()) cid: number): {} {
        return this.service.findById(cid);
    }

    @Post()
    create(@Body() dto: Omit<JobContract, 'cid'>): {} {
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
