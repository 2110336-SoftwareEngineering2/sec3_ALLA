import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/entities/employer.entity';
<<<<<<< HEAD
import { User } from 'src/entities/user.entity';
=======
import { User, UserType } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
import { Repository } from 'typeorm';

@Injectable()
export class EmployerService {
  constructor(
<<<<<<< HEAD
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
=======
    @InjectRepository(Employer) private readonly employer_repo: Repository<Employer>,
    private readonly userService: UserService,
  ) {}

  get_all(){
    return this.employer_repo.find()
  }

  findById(id:number){
    return  this.employer_repo.findOne(id);
  }

  async create(dto: Employer){
    if(await this.userService.get_type(dto.eid)!="EMPLOYER"){
      return "Invalid Role"
    }
    if(this.userService.findById(dto.eid)){
      const employer = { ...new Employer(), ...dto};
      this.employer_repo.save(employer);
      console.log(`eid ${employer.eid} is registered`);
      return employer
    }
    else{
      throw new BadRequestException("Invalid eid");
    }
  }


>>>>>>> 01e3bd7... Create user, employer, student, and basic get
}
