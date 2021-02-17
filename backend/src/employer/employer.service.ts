import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/entities/employer.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer) private readonly repo: Repository<Employer>,
  ) {}

  async create(dto: Omit<Employer, 'eid'>): Promise<Employer> {
    const employer = { ...new Employer(), ...dto };
    return this.repo.save(employer);
  }

  //for querying
  findById(eid: number): Promise<Employer> {
    return this.repo.findOne(eid);
  }

  findByUser(user: User): Promise<Employer> {
    return this.repo.findOne({ user });
  }

  async update(
    user: User,
    dto: Partial<Omit<Employer, 'eid'>>,
  ): Promise<Employer> {
    const employer = { ...(await this.findByUser(user)), ...dto };
    console.log(employer);
    return this.repo.save(employer);
  }

  async delete(user: User) {
    const employer = await this.findByUser(user);
    console.log(employer);
    await this.repo.remove(employer);
    return employer;
  }
}
