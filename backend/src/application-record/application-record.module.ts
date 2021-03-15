import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { ApplicationRecordController } from './application-record.controller';
import { ApplicationRecordService } from './application-record.service';

@Module({
    imports : [TypeOrmModule.forFeature([ApplicationRecord])],
    controllers: [ApplicationRecordController],
    providers: [ApplicationRecordService],
    exports : [ApplicationRecordService]
})
export class ApplicationRecordModule {}
