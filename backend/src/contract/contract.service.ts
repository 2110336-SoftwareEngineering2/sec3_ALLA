import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract, ContractStatus } from 'src/entities/contract.entity';
import { JobService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const conAttr = ['cid', 'eid', 'sid', 'jid', 'start_date', 'status'];

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

    var dtoo = {start_date: new Date()};

    const con = { ...new Contract(), employer, student, job, ...dtoo};
    console.log('contract created');
    return this.repo.save(con);
  }

  async findById(cid: number): Promise<Contract> {
    const con = await this.repo.findOne(cid);
    if (!con) throw new NotFoundException('Job Contract ID not found');
    else {
      const timeout =  await this.check_timeout(cid);
      var dtoo = {};
      if (timeout) dtoo['status'] = ContractStatus.TIMEOUT;
      await this.update(cid, dtoo);
      return con;
    }
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
    dtoo['status'] = dto.status;
    const con = { ...(await this.findById(cid)), ...dtoo };
    return this.repo.save(con);
  }

  async check_timeout(cid: number){
    const con = await this.findById(cid);
    var result = new Date(con.start_date);
    result.setDate(result.getDate() + con.job.duration);
    const present_date = new Date();
    if (result > present_date) return 1;
    else return 0;
  }

  async navigate(cid: number, dto: any){
    const con = await this.findById(cid);
    const status = con.status;

    var dtoo = {};

    if (status == ContractStatus.DOING){
      const timeout =  await this.check_timeout(cid);
      if (timeout) dtoo['status'] = ContractStatus.TIMEOUT;
      else{
        if (dto.request === 'submit'){
          dtoo['status'] = ContractStatus.SUBMITTED;
        }
        if (dto.request === 'resign'){
          dtoo['status'] = ContractStatus.RESIGN_REQ;
        }
      }
    }
    if (status == ContractStatus.SUBMITTED){
      if (dto.yesFlag){
        dtoo['status'] = ContractStatus.DONE;
        // create feedback...
      }
      else{
        dtoo['status'] = ContractStatus.DOING;
      }
    }
    if (status == ContractStatus.RESIGN_REQ){
      if (dto.yesFlag){
        dtoo['status'] = ContractStatus.RESIGN;
      }
      else{
        dtoo['status'] = ContractStatus.DOING;
      }
    }
    this.update(cid, dtoo);
  }

  async getAssociatedId(cid: number) {
    const con = await this.repo.findOne(cid, {
      relations: ['employer', 'student', 'job'],
    });
    return {
      sid: con.student.id,
      eid: con.employer.id,
      jid: con.job.jid,
    };
  }

  async delete(cid: number): Promise<Contract> {
    const con = await this.findById(cid);
    await this.repo.remove(con);
    return con;
  }
}
