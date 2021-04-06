import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { EventLog, EventNum } from 'src/entities/eventLog.entity';
import { JobService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog)
    private readonly eventRepo: Repository<EventLog>,
    private readonly userService: UserService,
    private readonly jobService: JobService,
    private readonly chatService: ChatService,
  ) {}

  async findById(id: number) {
    const event = await this.eventRepo.findOne(id, {
      relations: ['job', 'student', 'employer'],
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async findByUser(uid: number) {
    const event = await getRepository(EventLog)
      .createQueryBuilder('eventLog')
      .leftJoinAndSelect('eventLog.job', 'job')
      .leftJoinAndSelect('eventLog.student', 'student')
      .leftJoinAndSelect('eventLog.employer', 'employer')
      .where('student.id = :id OR employer.id = :id')
      .setParameter('id', uid)
      .orderBy('eventLog.timestamp', 'ASC')
      .getMany();
    
    return event;
  }

  async create(dto: any, event: any, addition: Boolean = null) {
    const dtoo = {
      ...new EventLog(),
      student: dto.student,
      employer: dto.employer,
      job: dto.job,
      timestamp: new Date(),
      addition: addition,
      state: event,
    };
    const ret = await this.eventRepo.save(dtoo);
    this.chatService.notify(ret, dto.student.id, dto.employer.id);
    return ret;
  }
}
