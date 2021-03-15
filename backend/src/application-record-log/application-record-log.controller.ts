import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApplicationRecordLog } from 'src/entities/applicationRecordLog.entity';
import { ApplicationRecordLogService } from './application-record-log.service';

@Controller('application-record-log')
export class ApplicationRecordLogController {
    
    constructor(private readonly service: ApplicationRecordLogService) {}

    //@UseGuards(AuthGuard)
    @Get(':lid')
    findById(@Param('lid', new ParseIntPipe()) lid: number): {} {
        return this.service.findById(lid);
    }

    @Post()
    create(@Body() dto: Omit<ApplicationRecordLog, 'lid'>): {} {
        return this.service.create(dto);
    }

    // no need update
    
    //@UseGuards(OwnGuard)
    @Delete(':lid')
    delete(@Param('lid', new ParseIntPipe()) lid: number): {} {
        return this.service.delete(lid);
    } 
    
}
