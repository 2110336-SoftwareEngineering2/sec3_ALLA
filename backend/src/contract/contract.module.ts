import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';
import { Contract } from 'src/entities/contract.entity';
import { EventLogModule } from 'src/event-log/event-log.module';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { JobModule } from 'src/job/job.module';
import { UserModule } from 'src/user/user.module';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
    imports : [TypeOrmModule.forFeature([Contract]), UserModule, JobModule, FeedbackModule, EventLogModule],
    controllers: [ContractController],
    providers: [ContractService],
    exports : [ContractService]
})
export class ContractModule {}
