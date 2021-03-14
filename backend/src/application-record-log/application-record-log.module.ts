import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRecordLog } from 'src/entities/applicationRecordLog.entity';
import { ApplicationRecordLogController } from './application-record-log.controller';
import { ApplicationRecordLogService } from './application-record-log.service';

@Module({
  imports : [TypeOrmModule.forFeature([ApplicationRecordLog])],
  controllers: [ApplicationRecordLogController],
  providers: [ApplicationRecordLogService],
  exports : [ApplicationRecordLogService]
})
export class ApplicationRecordLogModule {}
