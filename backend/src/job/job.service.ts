import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployerService } from 'src/employer/employer.service';
import { Job } from 'src/entities/job.entity';
import { User, UserType } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { getRepository, Repository } from 'typeorm';

const requiredJobAttr = [
  'id',
  'companyPicUrl',
  'companyName',
  'jobTitle',
  'location',
  'minimumEducation',
  'workingHours',
  'salaryMin',
  'salaryMax',
  'positionLeft',
  'description',
  'responsibility',
  'requirement',
  'status',
  'uid',
  'tagList',
  'duration'
  //'createdDate',
];

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly repo: Repository<Job>,
    private readonly userService: UserService,
  ) {}

  async create(dto: any): Promise<Job> {
    var dtoo = {};
    for (const [key, value] of Object.entries(dto)) {
      if (!requiredJobAttr.includes(key))
        throw new NotAcceptableException('Some fields are not defined');
      else if (key !== 'jid') dtoo[key] = value;
    }
    const user = await this.userService.findById(dto.id);
    console.log(dto.id);
    if (!user) throw new NotFoundException('User not found');
    console.log(user);
    if (user.type == UserType.EMPLOYER) {
      dtoo['createdDate'] = new Date();
      dtoo['employer'] = user;
      const job = { ...new Job(), ...dtoo };
      return this.repo.save(job);
    } else
      throw new NotAcceptableException(
        'User do not have the permission to create a job',
      );
  }

  async findById(jid: number): Promise<Job> {
    const job = await this.repo.findOne(jid);
    if (job === undefined) throw new NotFoundException('Job ID not found');
    else return job;
  }

  async viewJob(jid: number) {
    const job = await this.repo.findOne(jid, { relations: ['employer'] });
    //console.log(job);
    if (!job) throw new NotFoundException('Job ID not found');
    return job;
  }

  async findJobOwner(jid: number) {
    const job = await this.viewJob(jid);
    return job.employer.id;
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

  async decrementPosition(jid: number) {
    const job = await this.findById(jid);
    if (!job.positionLeft) throw new ConflictException('Job is fulled');
    job.positionLeft = job.positionLeft - 1;
    return this.repo.save(job);
  }

  async searchDB(
    queryStr: string,
    tagList: string[],
    time: string,
    salaryMin: number,
    salaryMax: number,
  ) {
    try {
      queryStr = queryStr.toLowerCase();
    } catch (e) {}

    const res = await getRepository(Job)
      .createQueryBuilder('job')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('job2.jid')
          .from(Job, 'job2')
          .where(
            'job2.salaryMin >= :salaryMin \
                  AND job2.salaryMax <= :salaryMax \
                  AND job2.createdDate >= :time',
          )
          .getQuery();

        return (
          'job.jid IN ' +
          subQuery +
          ' AND ( LOWER(job.jobTitle) LIKE :search OR LOWER(job.companyName) LIKE :search OR LOWER(job.location) LIKE :search)'
        );
      })

      .setParameter('salaryMin', salaryMin)
      .setParameter('salaryMax', salaryMax)
      .setParameter('time', time)
      .setParameter('search', `%${queryStr}%`)
      .getMany();

    let ret = [];
    for (var i = 0; i < res.length; i++) {
      const jobObj = res[i];
      if (jobObj.tagList.filter((value) => tagList.includes(value)).length)
        ret.push(jobObj);
    }
    return tagList.length == 0 ? res : ret;
  }
}
