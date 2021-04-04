import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';
import { EventLog } from 'src/entities/eventLog.entity';
import { JobModule } from 'src/job/job.module';
import { UserModule } from 'src/user/user.module';
import { EventLogController } from './event-log.controller';
import { EventLogService } from './event-log.service';

@Module({
  imports : [TypeOrmModule.forFeature([EventLog]), UserModule, JobModule, ChatModule],
  controllers: [EventLogController],
  providers: [EventLogService],
  exports : [EventLogService]
})
export class EventLogModule {}
 