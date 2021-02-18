import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
<<<<<<< HEAD
  exports: [StudentService]
=======
  exports:[]
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
})
export class StudentModule {}
