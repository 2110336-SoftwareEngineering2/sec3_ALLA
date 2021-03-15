import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobContract } from 'src/entities/jobcontract.entity';
import { JobcontractController } from './jobcontract.controller';
import { JobcontractService } from './jobcontract.service';

@Module({
    imports : [TypeOrmModule.forFeature([JobContract])],
    controllers: [JobcontractController],
    providers: [JobcontractService],
    exports : [JobcontractService]
})
export class JobcontractModule {}
