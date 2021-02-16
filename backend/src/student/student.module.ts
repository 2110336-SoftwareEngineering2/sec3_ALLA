import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { UserModule } from 'src/user/user.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), UserModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
