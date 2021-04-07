import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Student } from 'src/entities/student.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly service: StudentService) {}

    @UseGuards(AuthGuard)
    @Get(':sid')
    findById(@Param('sid', new ParseIntPipe()) sid: number): Promise<Student>{
        return this.service.findById(sid);
    }

    @Post('upload/resume/:sid')
    @UseInterceptors(FileInterceptor('file'))
    async upload_resume(
        @Param('sid', new ParseIntPipe()) sid:number,
        @UploadedFile() file: Express.Multer.File) : Promise<any>{
            console.log(`student id : ${sid} is uploading reume`);
            return this.service.addResume(sid, file.buffer, file.originalname);
    }
    
    @Get('resume/:sid')
    async get_resume(
        @Param('sid', new ParseIntPipe()) sid:number
    ):Promise<string>{
        return this.service.get_resumeURL(sid);
    }

    @Delete('delete/resume/:sid')
    async delete_resume(
        @Param('sid', new ParseIntPipe()) sid:number
    ){
        console.log(`sid : ${sid} is deleting resume`);
        this.service.delete_resume(sid);
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
}
