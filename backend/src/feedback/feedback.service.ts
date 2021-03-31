import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { JobService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
    
    constructor(
        @InjectRepository(Feedback) private readonly repo: Repository<Feedback>,
        private readonly userService: UserService,
        private readonly jobService: JobService
    ) {}

    async create(dto: any): Promise<Feedback> {
        const student = await this.userService.findById(dto.sid);
        const employer = await this.userService.findById(dto.eid);
        const job = await this.jobService.findById(dto.jid);
        var dtoo = {}
        dtoo['rate'] = dto.rate;
        dtoo['comment'] = dto.comment;
        const feed = { ...new Feedback(), employer, student, job, ...dtoo};
        return this.repo.save(feed);
    }

    async findById(fid: number): Promise<Feedback> {
        const feed = await this.repo.findOne(fid);
        if (!feed) throw new NotFoundException('Feedback ID not found');
        else return feed;
    }
    
    async update(fid: number, dto: Partial<Omit<Feedback, 'fid'>>,): Promise<Feedback> {
        if (dto.employer || dto.student || dto.job)
            throw new NotAcceptableException('Employer/Student/Job is not modifiable');
        var dtoo = {}
        dtoo['rate'] = dto.rate;
        dtoo['comment'] = dto.comment;
        const feed = { ...(await this.findById(fid)), ...dtoo };
        return this.repo.save(feed);
    }

    async delete(fid: number): Promise<Feedback> {
        const feed = await this.findById(fid);
        await this.repo.remove(feed);
        return feed;
    }

}
