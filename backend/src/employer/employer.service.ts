import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/entities/employer.entity';
import { User, UserType } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer) private readonly employer_repo: Repository<Employer>,
    @InjectRepository(Employer) private readonly user_repo: Repository<User>,
  ) {}

  async create(dto:Employer){
    if(await this.get_type(dto.eid)!="EMPLOYER"){
      throw new BadRequestException("Invalid Role");
    }
    if(this.findById(dto.eid)){
      const employer = { ...new Employer(), ...dto};
      this.employer_repo.save(employer);
      console.log(`eid ${employer.eid} is registered`);
      return employer
    }
    else{
      throw new BadRequestException("Invalid eid");
    }

  }

  //for querying
  async get_type(id:number){
    const x = await this.user_repo.findOne(id);
    console.log(x);
    return x['type']
  }

  get_all(){
    return this.employer_repo.find()
  }

  findById(eid: number): Promise<Employer> {
    return this.employer_repo.findOne(eid);
  }

  findByUser(user: User): Promise<Employer> {
    return this.employer_repo.findOne({ user });
  }

  async update(
    user: User,
    dto: Partial<Omit<Employer, 'eid'>>,
  ): Promise<Employer> {
    const employer = { ...(await this.findByUser(user)), ...dto };
    console.log(employer);
    return this.employer_repo.save(employer);
  }

  async delete(user: User) {
    const employer = await this.findByUser(user);
    console.log(employer);
    await this.employer_repo.remove(employer);
    return employer;
  }




 

}
