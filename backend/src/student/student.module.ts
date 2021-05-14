import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { FileModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]),FileModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {}
