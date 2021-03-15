import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { Repository } from 'typeorm';

const recAttr = [
    'rid',
    'employer',
    'student',
    'job',
    'state',
    'ackFlag',
    'yesNoFlag'
]

@Injectable()
export class ApplicationRecordService {

    constructor(
        @InjectRepository(ApplicationRecord) private readonly repo: Repository<ApplicationRecord>
    ){}

    async create(dto: Omit<ApplicationRecord, 'rid'>): Promise<ApplicationRecord> {
        var dtoo = {};
        for (const [key, value] of Object.entries(dto)) {
            if (!recAttr.includes(key)) new NotAcceptableException('Some fields are not defined');
            else if (key !== 'rid') dtoo[key] = value;
        }
        dtoo['state'] = 1;
        dtoo['ackFlag'] = false;
        dtoo['yesNoFlag'] = false;
        const rec = { ...new ApplicationRecord(), ...dtoo };
        return this.repo.save(rec);
    }

    async findById(rid: number): Promise<ApplicationRecord> {
        const rec = await this.repo.findOne(rid);
        if (rec === undefined) throw new NotFoundException("Application Record ID not found");
        else return rec;
    }

    async update(rid: number, dto: Partial<Omit<ApplicationRecord, 'rid'>>): Promise<ApplicationRecord> {
        var dtoo = {};
        if (dto.employer || dto.student || dto.job) 
            throw new NotAcceptableException('Employer/Student/Job is not modifiable');
        for (const [key, value] of Object.entries(dto)) {
            if (!recAttr.includes(key)) new NotAcceptableException('Some fields are not defined');
            else if (key !== 'rid') dtoo[key] = value;
        }
        const rec = { ...(await this.findById(rid)), ...dtoo };
        return this.repo.save(rec);
    }

    async delete(rid: number): Promise<ApplicationRecord> {
        const rec = await this.findById(rid);
        await this.repo.remove(rec);
        return rec;
    }
    
}
