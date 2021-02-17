import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Student } from 'src/entities/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly service: StudentService){}

    @Get(':sid')
    findById(@Param('sid', new ParseIntPipe()) sid: number): Promise<Student>{
        return this.service.findById(sid);
    }

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
    }

}
