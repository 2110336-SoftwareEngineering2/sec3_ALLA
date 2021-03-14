import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobContract } from 'src/entities/jobcontract.entity';
import { Repository } from 'typeorm';

const conAttr = [
    'cid',
    'employer',
    'student',
    'job',
    'status'
]

@Injectable()
export class JobcontractService {
    
    constructor(@InjectRepository(JobContract) private readonly repo: Repository<JobContract>){}

    async create(dto: Omit<JobContract, 'cid'>): Promise<JobContract> {
        var dtoo = {};
        for (const [key, value] of Object.entries(dto)) {
            if (!conAttr.includes(key)) new NotAcceptableException('Some fields are not defined');
            else if (key !== 'cid') dtoo[key] = value;
        }
        dtoo['status'] = 'DOING';
        const con = { ...new JobContract(), ...dtoo };
        return this.repo.save(con);
    }

    async findById(cid: number): Promise<JobContract> {
        const con = await this.repo.findOne(cid);
        if (con === undefined) throw new NotFoundException("Job Contract ID not found");
        else return con;
    }

    async update(cid: number, dto: Partial<Omit<JobContract, 'cid'>>): Promise<JobContract> {
        var dtoo = {};
        if (dto.employer || dto.student || dto.job) 
            throw new NotAcceptableException('Employer/Student/Job is not modifiable');
        for (const [key, value] of Object.entries(dto)) {
            if (!conAttr.includes(key)) new NotAcceptableException('Some fields are not defined');
            else if (key !== 'cid') dtoo[key] = value;
        }
        const con = { ...(await this.findById(cid)), ...dtoo };
        return this.repo.save(con);
    }

    async delete(cid: number): Promise<JobContract> {
        const con = await this.findById(cid);
        await this.repo.remove(con);
        return con;
    }
}
