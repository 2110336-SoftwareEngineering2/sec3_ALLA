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

  async create(dto: Omit<Employer, 'eid'>): Promise<Employer> {
    const employer = { ...new Employer(), ...dto };
    return this.repo.save(employer);
  }
  
  //for querying
  findById(eid: number): Promise<Employer> {
    return this.repo.findOne(eid);
  }

  async update(eid: number, dto: Partial<Omit<Employer, 'eid'>>): Promise<Employer> {
    const employer = { ...(await this.findById(eid)), ...dto };
    return this.repo.save(employer);
  }

  async delete(eid: number) {
    const employer = await this.findById(eid);
    await this.repo.remove(employer);
    return employer;
  }


}
