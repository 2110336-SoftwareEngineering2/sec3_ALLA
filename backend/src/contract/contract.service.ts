import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract, ContractStatus } from 'src/entities/contract.entity';
import { EventLogService } from 'src/event-log/event-log.service';
import { FeedbackService } from 'src/feedback/feedback.service';
import { JobService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const conAttr = ['cid', 'eid', 'sid', 'jid', 'start_date', 'status', 'time_left'];

@Injectable()
export class ContractService {

  constructor(
    @InjectRepository(Contract) private readonly repo: Repository<Contract>,
    private readonly userService: UserService,
    private readonly jobService: JobService,
    private readonly feedbackService: FeedbackService,
    private readonly eventLogService: EventLogService
  ) {}

  async create(dto: any): Promise<Contract> {
    const student = await this.userService.findById(dto.sid);
    const employer = await this.userService.findById(dto.eid);
    const job = await this.jobService.findById(dto.jid);

    var dtoo = {start_date: new Date()};
    dtoo['time_left'] = job.duration;

    const con = { ...new Contract(), employer, student, job, ...dtoo};
    console.log('contract created');
    const ret = await this.repo.save(con);
    await this.addEvent(ret.cid, 4, null);
    return ret;
  }

  async check_timeout_update_timeleft(cid: number){
    const con = await this.repo.findOne(cid,{relations: ['job']});
    var exp = new Date(con.start_date);
    console.log('got in function check_timeout');
    console.log('expire on before :', exp);
    exp.setDate(exp.getDate() + con.job.duration);
    console.log('expire on after :', exp);
    const present_date = new Date();
    console.log('present date:', present_date);
    var dtoo = {}
    //const tl = exp.getDate() - present_date.getDate();
    let tl = exp.getTime() - present_date.getTime();
    tl = tl/(1000*60*60*24);
    console.log('tl:', tl);
    dtoo['time_left'] = tl;
    const conn = await {...(await this.repo.findOne(cid)), ...dtoo};
    await this.repo.save(conn);
    if (exp < present_date) return 1;
    else return 0;
  }

  async findById(cid: number): Promise<Contract> {
    const con = await this.repo.findOne(cid);
    if (!con) throw new NotFoundException('Job Contract ID not found');
    else {
      console.log('start computing timeout');
      const timeout = await this.check_timeout_update_timeleft(cid);
      console.log('timeout computed completed with result:', timeout);
      var dtoo = {};
      if (timeout) {
        dtoo['status'] = ContractStatus.TIMEOUT;
        await this.addEvent(cid, 7, null);
        return await this.update(cid, dtoo);
      }
      else return await this.repo.findOne(cid);
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

    // for testing timeout handling
    /*
    dtoo['start_date'] = dto.start_date;
    */
    const con = { ...(await this.repo.findOne(cid)), ...dtoo };
    return this.repo.save(con);
  }

  async navigate(cid: number, dto: any){
    const con = await this.repo.findOne(cid, {relations : ['student', 'employer', 'job']});
    const status = con.status;

    let eventFlag = 1;
    var dtoo = {};

    if (status == ContractStatus.DOING){

      // for testing timeout handling
      /*
      var tmp = {};
      tmp['start_date'] = new Date(2021, 2, 20);
      console.log('new bad startdate', tmp['start_date']);
      await this.update(cid, tmp);
      */
     
      const timeout =  await this.check_timeout_update_timeleft(cid);
      if (timeout) dtoo['status'] = ContractStatus.TIMEOUT;
      else{
        if (dto.request === 'submit'){
          dtoo['status'] = ContractStatus.SUBMITTED;
          eventFlag = 4;
        }
        if (dto.request === 'resign'){
          dtoo['status'] = ContractStatus.RESIGN_REQ;
          eventFlag = 8;
        }
      }
    }
    if (status == ContractStatus.SUBMITTED){
      eventFlag = 6;
      if (dto.yesFlag){
        for (const key of ['rate', 'comment']) {
          if (!dto.key) throw new NotAcceptableException('Fields for feedback are required');
        }
        dtoo['status'] = ContractStatus.DONE;
        // create feedback...
        var dto_feed = {
          student: con.student,
          employer: con.employer,
          job: con.job,
          rate: dto.rate,
          comment: dto.comment
        };    
        await this.feedbackService.create(dto_feed);
      }
      else{
        dtoo['status'] = ContractStatus.DOING;
      }
    }
    if (status == ContractStatus.RESIGN_REQ){
      eventFlag = 9;
      if (dto.yesFlag){
        dtoo['status'] = ContractStatus.RESIGNED;
      }
      else{
        dtoo['status'] = ContractStatus.DOING;
      }
    }
    await this.update(cid, dtoo);
    await this.addEvent(cid, eventFlag, dto.yesFlag);
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

  async addEvent(cid: number, eventFlag: number, addition: Boolean) {
    const contract = await this.repo.findOne(cid, {
      relations: ['employer', 'student', 'job'],
    });
    await this.eventLogService.create(contract, eventFlag, addition);
    console.log('Event logged');
  }
}
