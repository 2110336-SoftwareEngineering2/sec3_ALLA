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
import { Student } from 'src/entities/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly student_service: StudentService) {}

    @Get("get-all-student")
    get_all_student()
    {
        return this.student_service.get_all();
    }
    
    @Get('get-a-student/:sid')
    findById(@Param('sid', new ParseIntPipe()) sid: number): Promise<Student>{
        return this.student_service.findById(sid);
    }
    
    @Post(':create')
    create(@Body() dto:Student): Promise<Student>{
        return this.student_service.create(dto);
    }
    
    /*
    @Delete(':sid')
    delete(@Param('sid', new ParseIntPipe()) sid: number): Promise<Student>{
        return this.service.delete(sid);
    }

    @Patch(':sid')
    update(@Param('sid', new ParseIntPipe()) sid: number,
        @Body() dto: Partial<Omit<Student, 'sid'>> ): Promise<Student>{
            return this.service.update(sid, dto);
    }*/
}
