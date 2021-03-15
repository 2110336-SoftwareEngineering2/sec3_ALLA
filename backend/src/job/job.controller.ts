import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Job } from 'src/entities/job.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { JobGuard } from 'src/guard/job.guard';
import { OwnGuard } from 'src/guard/own.guard';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly service: JobService) {}

  //@UseGuards(AuthGuard)
  @Get(':jid')
  findById(@Param('jid', new ParseIntPipe()) jid: number): {} {
    return this.service.viewJob(jid);
  }

  //@UseGuards(OwnGuard)
  @Post()
  create(@Body() dto: Omit<Job, 'jid'>): {} {
    console.log('created');
    return this.service.create(dto);
  }

  //@UseGuards(JobGuard)
  @Patch(':jid')
  update(@Param('jid', new ParseIntPipe()) jid: number, @Body() dto: {}): {} {
    return this.service.update(jid, dto);
  }

  //@UseGuards(JobGuard)
  @Delete(':jid')
  delete(@Param('jid', new ParseIntPipe()) jid: number): {} {
    return this.service.delete(jid);
  }

  //@UseGuards(AuthGuard)
  @Get('/search/all/')
  async searchJob(
    @Query('q') searchQuery: string,
    @Query('tag') jobTag: string,
    @Query('t') time: string,
    @Query('smin', new ParseIntPipe()) salaryMin: number,
    @Query('smax', new ParseIntPipe()) salaryMax: number,
  ) {
    const tagList = jobTag.length > 0 ? jobTag.split('_') : [];
    time = time == '' ? '1000-01-01' : time;
    return this.service.searchDB(searchQuery, tagList, time, salaryMin, salaryMax)
  }
}
 