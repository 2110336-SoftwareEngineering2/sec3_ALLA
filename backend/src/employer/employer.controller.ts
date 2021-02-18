import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Employer } from 'src/entities/employer.entity';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employer_service: EmployerService) {}

  @Get("get-all-employer")
  get_all_employer(){
      return this.employer_service.get_all();
  }

  @Get('get-an-employer/:eid')
  findById(@Param('eid', new ParseIntPipe()) eid: number): Promise<Employer> {
    return this.employer_service.findById(eid);
  }
  
    @Post('create')
    create(@Body() dto:Employer): Promise<Employer>{
        return this.employer_service.create(dto);
    }
/*
    @Delete(':eid')
    delete(@Param('eid', new ParseIntPipe()) eid: number): Promise<Employer>{
        return this.service.delete(eid);
    }

    @Patch(':eid')
    update(@Param('eid', new ParseIntPipe()) eid: number,
        @Body() dto: Partial<Omit<Employer, 'eid'>> ): Promise<Employer>{
            return this.service.update(eid, dto);
    }
*/



}
