<<<<<<< HEAD
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
=======
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
import { Employer } from 'src/entities/employer.entity';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
<<<<<<< HEAD
  constructor(private readonly service: EmployerService) {}

  @Get(':eid')
  findById(@Param('eid', new ParseIntPipe()) eid: number): Promise<Employer> {
    return this.service.findById(eid);
  }
  /*
    @Post()
    create(@Body() dto: Omit<Employer,'eid'> ): Promise<Employer>{
        return this.service.create(dto);
    }

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
=======

    constructor(
        private employer_service:EmployerService
    ){}

    @Get("get-all-employer")
    get_all_employer(){
        return this.employer_service.get_all();
    }

    @Get("get-an-employer/:id")
    get_an_employer(
        @Param("id") id:number
    )
    {
        return this.employer_service.findById(id);
    }

    @Post(':create')
    async create_employer(
        @Body() dto:Employer
    )
    {
        return await this.employer_service.create(dto);
    }



>>>>>>> 01e3bd7... Create user, employer, student, and basic get
}
