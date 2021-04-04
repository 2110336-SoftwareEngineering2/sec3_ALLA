import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventLog } from 'src/entities/eventLog.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog)
    private readonly eventRepo: Repository<EventLog>,
    private readonly userService: UserService,
  ) {}


  async findById(id: number) {
    const event = await this.eventRepo.findOne({id})
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async create(dto: any, addition = null) {

  }


}
