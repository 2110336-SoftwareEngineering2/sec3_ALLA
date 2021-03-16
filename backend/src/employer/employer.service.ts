import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findUserId(eid: number) {
    const employer = await this.repo.findOne(eid, {relations : ['user']});
    if (employer === undefined) throw new NotFoundException("Employer ID not found");
    return employer.user.id;
  }

  async findById(eid: number): Promise<Employer> {
    const employer = await this.repo.findOne(eid);
    if (employer === undefined) throw new NotFoundException("Employer ID not found");
    else return employer;
  }

  // handled in user service, guarantee able to find
  findByUser(user: User): Promise<Employer> {
    return this.repo.findOne({ user });
  }

  // handled in user service, guarantee able to update
  async update(user: User, dto: Partial<Omit<Employer, 'eid'>>): Promise<Employer> {
    const employer = { ...(await this.findByUser(user)), ...dto };
    return this.repo.save(employer);
  }

  // do not need?
  /*
  async delete(user: User) {
    const employer = await this.findByUser(user);
    console.log(employer);
    await this.repo.remove(employer);
    return employer;
  }
  */
}
