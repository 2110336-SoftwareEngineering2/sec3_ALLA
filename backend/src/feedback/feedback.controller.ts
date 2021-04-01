import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Feedback } from 'src/entities/feedback.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { OwnGuard } from 'src/guard/own.guard';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {

  constructor(private readonly service: FeedbackService) {}

  // @UseGuards(AuthGuard)
  @Get(':fid')
  findById(@Param('fid', new ParseIntPipe()) fid: number): {} {
    return this.service.findById(fid);
  }

  // @UseGuards(OwnGuard)
  @Post()
  create(@Body() dto: Omit<Feedback, 'fid'>): {} {
    return this.service.create(dto);
  }
  
  @Patch(':fid')
  update(@Param('fid', new ParseIntPipe()) fid: number, @Body() dto: {}): {} {
    return this.service.update(fid, dto);
  }

  @Delete(':fid')
  delete(@Param('fid', new ParseIntPipe()) fid: number): {} {
    return this.service.delete(fid);
  }
}
