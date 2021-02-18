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
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
import { Student } from 'src/entities/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
<<<<<<< HEAD
  constructor(private readonly service: StudentService) {}

    @Get(':sid')
    findById(@Param('sid', new ParseIntPipe()) sid: number): Promise<Student>{
        return this.service.findById(sid);
    }
    /*
    @Post()
    create(@Body() dto: Omit<Student,'sid'> ): Promise<Student>{
        return this.service.create(dto);
    }

    @Delete(':sid')
    delete(@Param('sid', new ParseIntPipe()) sid: number): Promise<Student>{
        return this.service.delete(sid);
    }

    @Patch(':sid')
    update(@Param('sid', new ParseIntPipe()) sid: number,
        @Body() dto: Partial<Omit<Student, 'sid'>> ): Promise<Student>{
            return this.service.update(sid, dto);
    }*/
=======
    constructor(
        private student_service:StudentService
    ){}

    @Get("get-all-student")
    get_all_student()
    {
        return this.student_service.get_all();
    }

    @Get("get-a-student/:id")
    get_a_student(@Param('id') id:number)
    {
        return this.student_service.findById(id);
    }

    @Post(':create')
    async create_student(@Body() dto:Student)
    {
        return await this.student_service.create(dto);
    }
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
}
