import { Module } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventLogController } from './event-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventLog } from 'src/entities/eventLog.entity';
import { User } from 'src/entities/user.entity';
import { Job } from 'src/entities/job.entity';
import { UserService } from 'src/user/user.service';
import { JobService } from 'src/job/job.service';
import { ContractService } from 'src/contract/contract.service';
import { ApplicationRecordService } from 'src/application-record/application-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventLog, User, Job]), UserService],
  providers: [EventLogService],
  controllers: [EventLogController],
  exports: [EventLogService]
})
export class EventLogModule {}
