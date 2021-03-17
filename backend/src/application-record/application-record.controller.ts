import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateRecordGuard } from 'src/guard/createRecord.guard';
import { RecordGuard } from 'src/guard/record.guard';
import { ApplicationRecordService } from './application-record.service';

@Controller('application-record')
export class ApplicationRecordController {
  constructor(private readonly service: ApplicationRecordService) {}

  @UseGuards(AuthGuard)
  @Get('detailed/:rid')
  findById(@Param('rid', new ParseIntPipe()) rid: number): {} {
    console.log('a');
    return this.service.findDetailedById(rid); 
  }

  @Post()
  @UseGuards(CreateRecordGuard)
  create(@Body() dto: Omit<ApplicationRecord, 'rid'>): {} {
    return this.service.create(dto);
  }

  @Post('navigate/:rid')
  @UseGuards(RecordGuard)
  navigate(@Param('rid', new ParseIntPipe()) rid: number, @Body() dto: any) {
    return this.service.navigate(rid, dto);
  }

  //@UseGuards(OwnGuard)
  /* @Patch(':rid')
  update(@Param('rid', new ParseIntPipe()) rid: number, @Body() dto: {}): {} {
    return this.service.update(rid, dto);
  } */

  //@UseGuards(OwnGuard)
  @Delete(':rid')
  delete(@Param('rid', new ParseIntPipe()) rid: number): {} {
    return this.service.delete(rid);
  }
}
