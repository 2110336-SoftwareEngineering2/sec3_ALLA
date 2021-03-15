import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerModule } from 'src/employer/employer.module';
import { Job } from 'src/entities/job.entity';
import { UserModule } from 'src/user/user.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports : [TypeOrmModule.forFeature([Job]), UserModule, EmployerModule],
  controllers: [JobController],
  providers: [JobService],
  exports : [JobService]
})
export class JobModule {}