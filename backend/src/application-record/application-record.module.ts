import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { Contract } from 'src/entities/contract.entity';
import { JobModule } from 'src/job/job.module';
import { ContractModule } from 'src/contract/contract.module';
import { UserModule } from 'src/user/user.module';
import { ApplicationRecordController } from './application-record.controller';
import { ApplicationRecordService } from './application-record.service';

@Module({
    imports : [TypeOrmModule.forFeature([ApplicationRecord]), UserModule, JobModule, ContractModule],
    controllers: [ApplicationRecordController],
    providers: [ApplicationRecordService],
    exports : [ApplicationRecordService]
})
export class ApplicationRecordModule {}
