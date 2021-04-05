import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EventLogService } from './event-log.service';

@Controller('event-log')
export class EventLogController {

    constructor(
        private readonly eventLogService: EventLogService
    ){}

    @Get(':id')
        async findById(@Param('id', new ParseIntPipe()) id: number) {
            return await this.eventLogService.findById(id);
    }
}
