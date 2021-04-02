import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventLog } from 'src/entities/eventLog.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog)
    private readonly roomRepo: Repository<EventLog>,
    private readonly userService: UserService,
  ) {}
}
