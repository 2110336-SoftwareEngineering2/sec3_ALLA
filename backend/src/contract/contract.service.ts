import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/entities/contract.entity';
import { JobService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const conAttr = ['cid', 'eid', 'sid', 'jid', 'status'];

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly repo: Repository<Contract>,
    private readonly userService: UserService,
    private readonly jobService: JobService,
  ) {}

  async create(dto: any): Promise<Contract> {
    const student = await this.userService.findById(dto.sid);
    const employer = await this.userService.findById(dto.eid);
    const job = await this.jobService.findById(dto.jid);

    const con = { ...new Contract(), employer, student, job };
    console.log('contract created');
    return this.repo.save(con);
  }

  async findById(cid: number): Promise<Contract> {
    const con = await this.repo.findOne(cid);
    if (!con) throw new NotFoundException('Job Contract ID not found');
    else return con;
  }

  async update(
    cid: number,
    dto: Partial<Omit<Contract, 'cid'>>,
  ): Promise<Contract> {
    var dtoo = {};
    if (dto.employer || dto.student || dto.job)
      throw new NotAcceptableException(
        'Employer/Student/Job is not modifiable',
      );
    /* for (const [key, value] of Object.entries(dto)) {
      if (!conAttr.includes(key))
        new NotAcceptableException('Some fields are not defined');
      else if (key !== 'cid') dtoo[key] = value;
    } */
    dtoo['status'] = dto.status;
    const con = { ...(await this.findById(cid)), ...dtoo };
    return this.repo.save(con);
  }

  async delete(cid: number): Promise<Contract> {
    const con = await this.findById(cid);
    await this.repo.remove(con);
    return con;
  }
}
