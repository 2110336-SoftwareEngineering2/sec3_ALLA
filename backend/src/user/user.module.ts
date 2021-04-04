import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerModule } from 'src/employer/employer.module';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { Contract } from 'src/entities/contract.entity';
import { Employer } from 'src/entities/employer.entity';
import { Job } from 'src/entities/job.entity';
import { Room } from 'src/entities/room.entity';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { FileModule } from 'src/files/files.module';
import { StudentModule } from 'src/student/student.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Job, Contract, ApplicationRecord, Room]),
    EmployerModule, StudentModule, FileModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
}) 
export class UserModule {}
  