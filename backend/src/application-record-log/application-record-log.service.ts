import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRecordLog } from 'src/entities/applicationRecordLog.entity';
import { Repository } from 'typeorm';

const logAttr = [
    'lid',
    'employer',
    'student',
    'job',
    'record',
    'state',
    'ackFlag',
    'timestamp'
]

@Injectable()
export class ApplicationRecordLogService {

    constructor(
        @InjectRepository(ApplicationRecordLog) private readonly repo: Repository<ApplicationRecordLog>
    ){}

    async create(dto: Omit<ApplicationRecordLog, 'lid'>): Promise<ApplicationRecordLog> {
        var dtoo = {};
        for (const [key, value] of Object.entries(dto)) {
            if (!logAttr.includes(key)) new NotAcceptableException('Some fields are not defined');
            else if (key !== 'lid') dtoo[key] = value;
        }
        dtoo['status'] = 1;
        dtoo['ackFlag'] = false;
        dtoo['timestamp'] = new Date();
        const log = { ...new ApplicationRecordLog(), ...dtoo };
        return this.repo.save(log);
    }

    async findById(lid: number): Promise<ApplicationRecordLog> {
        const log = await this.repo.findOne(lid);
        if (log === undefined) throw new NotFoundException("Application Record Log ID not found");
        else return log;
    }

    // no need update

    async delete(lid: number): Promise<ApplicationRecordLog> {
        const log = await this.findById(lid);
        await this.repo.remove(log);
        return log;
    }

}
