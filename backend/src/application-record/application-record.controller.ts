import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { ApplicationRecordService } from './application-record.service';

@Controller('application-record')
export class ApplicationRecordController {
    
    constructor(private readonly service: ApplicationRecordService) {}

    //@UseGuards(AuthGuard)
    @Get(':rid')
    findById(@Param('rid', new ParseIntPipe()) rid: number): {} {
        return this.service.findById(rid);
    }

    @Post()
    create(@Body() dto: Omit<ApplicationRecord, 'rid'>): {} {
        return this.service.create(dto);
    }

    //@UseGuards(OwnGuard)
    @Patch(':rid')
    update(@Param('rid', new ParseIntPipe()) rid: number, @Body() dto: {}): {} {
        return this.service.update(rid, dto);
    }
    
    //@UseGuards(OwnGuard)
    @Delete(':rid')
    delete(@Param('rid', new ParseIntPipe()) rid: number): {} {
        return this.service.delete(rid);
    } 
}
