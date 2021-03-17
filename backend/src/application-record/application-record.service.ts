import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { StateNum } from 'src/entities/applicationRecord.entity';
import { JobService } from 'src/job/job.service';
import { ContractService } from 'src/contract/contract.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const recAttr = ['rid', 'jid', 'state', 'yesFlag', 'sid'];

@Injectable()
export class ApplicationRecordService {
  constructor(
    @InjectRepository(ApplicationRecord)
    private readonly repo: Repository<ApplicationRecord>,
    private readonly userService: UserService,
    private readonly jobService: JobService,
    private readonly contractService: ContractService,
  ) {}

  async create(dto: any): Promise<ApplicationRecord> {
    var dtoo = {};
    for (const [key, value] of Object.entries(dto)) {
      if (!recAttr.includes(key))
        new NotAcceptableException('Some fields are not defined');
      else if (key !== 'rid' && key !== 'sid') dtoo[key] = value;
    }
    const student = await this.userService.findById(dto.sid);
    const job = await this.jobService.findById(dto.jid);
    const employerId = await this.jobService.findJobOwner(dto.jid);
    const employer = await this.userService.findById(employerId);
    const timestamp = new Date();

    const rec = {
      ...new ApplicationRecord(),
      student,
      job,
      employer,
      timestamp,
    };
    return this.repo.save(rec);
  }

  async findById(rid: number): Promise<ApplicationRecord> {
    const rec = await this.repo.findOne(rid);
    if (rec === undefined)
      throw new NotFoundException('Application Record ID not found');
    else return rec;
  }

  async findDetailedById(rid : number) {
    const rec = await this.repo.findOne(rid, {relations : ['student','employer','job']});
    if (!rec) throw new NotFoundException('Application Record ID not found');
    return rec;
  }

  async update(
    rid: number,
    dto: Partial<Omit<ApplicationRecord, 'rid'>>,
  ): Promise<ApplicationRecord> {
    var dtoo = {};
    if (dto.employer || dto.student || dto.job)
      throw new NotAcceptableException(
        'Employer/Student/Job is not modifiable',
      );
    for (const [key, value] of Object.entries(dto)) {
      if (!recAttr.includes(key))
        new NotAcceptableException('Some fields are not defined');
      else if (key !== 'rid') dtoo[key] = value;
    }
    const rec = { ...(await this.findById(rid)), ...dtoo };
    return this.repo.save(rec);
  }

  async navigate(rid: number, dto: any) {
    console.log(dto);
    const rec = await this.findById(rid);
    const state = rec.state;
    const dtoo = {
      state: state,
      yesFlag: null,
      timestamp: new Date(),
    };
    if (state == StateNum.APPLY) {
      if (dto.yesFlag == undefined)
        throw new NotAcceptableException('Invalid argument passing');
      dtoo.yesFlag = dto.yesFlag;
      dtoo.state = StateNum.OFFER;
    }
    if (state == StateNum.OFFER) {
      if (rec.yesFlag) {
        if (dto.yesFlag == undefined)
          throw new NotAcceptableException('Invalid argument passing');
        dtoo.yesFlag = dto.yesFlag;
        dtoo.state = StateNum.CONFIRM;
      } else {
        dtoo.state = StateNum.FINISH;
      }
    }
    if (state == StateNum.CONFIRM) {
      if (rec.yesFlag) {
        const allId = await this.getAssociatedId(rid);
        const job = await this.jobService.findById(allId.jid)
        if (!job.positionLeft) throw new NotAcceptableException('Job is fulled');
        const contract = await this.contractService.create(allId);
        if (contract) this.jobService.decrementPosition(allId.jid);
      }
      dtoo.state = StateNum.FINISH;
    }

    //replicate in log
    console.log(dtoo);
    this.update(rid, dtoo);
  }

  async getAssociatedId(rid: number) {
    const record = await this.repo.findOne(rid, {
      relations: ['employer', 'student', 'job'],
    });
    return {
      sid: record.student.id,
      eid: record.employer.id,
      jid: record.job.jid,
    };
  }

  async delete(rid: number): Promise<ApplicationRecord> {
    const rec = await this.findById(rid);
    await this.repo.remove(rec);
    return rec;
  }
}
