import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/entities/user.entity';
<<<<<<< HEAD
import { Repository, SimpleConsoleLogger } from 'typeorm';
=======
import { Repository } from 'typeorm';
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
import { hash } from 'bcryptjs';
import { Student } from 'src/entities/student.entity';
import { Employer } from 'src/entities/employer.entity';
import { StudentService } from 'src/student/student.service';
import { EmployerService } from 'src/employer/employer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly studentService: StudentService,
    private readonly employerService: EmployerService,
  ) {}

  get_all(){
    return this.userRepo.find();
  }

  async get_type(id:number){
    const x = await this.findById(id);
    console.log(x);
    return x['type']
  }


  findById(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ username });
  }

  //TODO : SAM
  async create(dto: Omit<User, 'id'>): Promise<User> {
    const password = await hash(dto.password, 10);
    const user = { ...new User(), ...dto, password };
    return this.userRepo.save(user);
  }


  async update(id: number, dto: any) : Promise<any> {
    var user_dto = {};
    var sub_dto = {};
    const userprops = [
      'username',
      'password',
      'type',
      'email',
      'firstName',
      'lastName',
      'phoneNumber',
    ];

    for (const [key, value] of Object.entries(dto)) {
      console.log(key + ' ' + value);
      if (userprops.includes(key)) {
        user_dto[key] = value;
      } else {
        sub_dto[key] = value;
      }
    }
    console.log(user_dto);
    console.log(sub_dto);

    const user = { ...(await this.findById(id)), ...user_dto };
    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }
    const ret_user = await this.userRepo.save(user);
    console.log('user updated');
    const ret_subUser =
      user.type == UserType.STUDENT
        ? await this.studentService.update(user, sub_dto)
        : await this.employerService.update(user, sub_dto);
    console.log('subuser updated');
    return {
      user: ret_user,
      subUser: ret_subUser,
    };
  }

  async delete(id: number) : Promise<User> {
    const user = await this.findById(id);
    await this.userRepo.remove(user);
    return user;
  }
}
