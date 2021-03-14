import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Job } from 'src/entities/job.entity';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    
    constructor(private readonly service: JobService) {}

    //@UseGuards(AuthGuard)
    @Get(':jid')
    findById(@Param('jid', new ParseIntPipe()) jid: number): {} {
        return this.service.findById(jid);
    }

    @Post()
    create(@Body() dto: Omit<Job, 'jid'>): {} {
        return this.service.create(dto);
    }

    //@UseGuards(OwnGuard)
    @Patch(':jid')
    update(@Param('jid', new ParseIntPipe()) jid: number, @Body() dto: {}): {} {
        return this.service.update(jid, dto);
    }
    
    //@UseGuards(OwnGuard)
    @Delete(':jid')
    delete(@Param('jid', new ParseIntPipe()) jid: number): {} {
        return this.service.delete(jid);
    } 
}
