import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployerService } from 'src/employer/employer.service';
import { Job } from 'src/entities/job.entity';
import { UserType } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const requiredJobAttr = [
  'jid',
  'companypic_url',
  'companyName',
  'jobtitle',
  'location',
  'minimumEducation',
  'workinghours',
  'salarymin',
  'salarymax',
  'positionLeft',
  'description',
  'responsibility',
  'requirement',
  'status',
  //'createdDate',
];

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly repo: Repository<Job>,
    private readonly userService : UserService,
    private readonly employerService : EmployerService,
  ) {}

  async create(dto: any): Promise<Job> {
    var dtoo = {};
    for (const [key, value] of Object.entries(dto)) {
      if (!requiredJobAttr.includes(key))
        throw new NotAcceptableException('Some fields are not defined');
      else if (key !== 'jid') dtoo[key] = value;
    }
    const user =  await this.userService.findById(dto.id);
    if (!user) throw new NotFoundException('User not found');
    if (user.type === UserType.EMPLOYER){
        const employer = await this.employerService.findByUser(user);
        dtoo['status'] = 'OPEN';
        dtoo['createdDate'] = new Date();
        dtoo['employer'] = employer;
        const job = { ...new Job(), ...dtoo };
        return this.repo.save(job);
    }
    else throw new NotAcceptableException('User do not have the permission to create a job');
  }

  async findById(jid: number): Promise<Job> {
    const job = await this.repo.findOne(jid);
    if (job === undefined) throw new NotFoundException('Job ID not found');
    else return job;
  }

  async update(jid: number, dto: Partial<Omit<Job, 'jid'>>): Promise<Job> {
    var dtoo = {};
    if (dto.employer)
      throw new NotAcceptableException('Employer (Owner) is not modifiable');
    for (const [key, value] of Object.entries(dto)) {
      if (!requiredJobAttr.includes(key))
        new NotAcceptableException('Some fields are not defined');
      else if (key !== 'jid') dtoo[key] = value;
    }
    const job = { ...(await this.findById(jid)), ...dtoo };
    return this.repo.save(job);
  }

  async delete(jid: number): Promise<Job> {
    const job = await this.findById(jid);
    await this.repo.remove(job);
    return job;
  }

  async decrementPosition(jid:number) {
    const job = await this.findById(jid);
    if (!job.positionLeft) throw new ConflictException('Job is fulled')
    job.positionLeft = job.positionLeft - 1;
    return this.repo.save(job);
  }
}
