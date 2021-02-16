import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/entities/employer.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer) private readonly repo: Repository<Employer>,
    private readonly userService: UserService,
  ) {}
}
