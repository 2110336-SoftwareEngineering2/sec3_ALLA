import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/entities/user.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { Student } from 'src/entities/student.entity';
import { Employer } from 'src/entities/employer.entity';
import { StudentService } from 'src/student/student.service';
import { EmployerService } from 'src/employer/employer.service';
import { Job } from 'src/entities/job.entity';
import { Contract } from 'src/entities/contract.entity';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';

const userprops = [
  'username',
  'password',
  'type',
  'email',
  'firstName',
  'lastName',
  'phoneNumber',
  'birthDate',
];
const studentprops = [
  'university',
  'degree',
  'faculty',
  'department',
  'fields_of_work',
];
const employerprops = ['company', 'position', 'fields_of_work'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly studentService: StudentService,
    private readonly employerService: EmployerService,
  ) {}

  async validUsername(username: string): Promise<Boolean> {
    const user = await this.userRepo.findOne({ username });
    return user !== undefined;
  }

  async validEmail(email: string): Promise<Boolean> {
    const user = await this.userRepo.findOne({ email });
    return user !== undefined;
  }

  async findById(id: number): Promise<any> {
    const user = await this.userRepo.findOne(id);
    if (user === undefined) throw new NotFoundException('User not found');
    const subUser =
      user.type == UserType.STUDENT
        ? await this.studentService.findByUser(user)
        : await this.employerService.findByUser(user);
    const { ['username']: un, ['password']: pw, ...rest } = user;
    return {
      ...rest,
      ...subUser,
    };
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ username });
    /* if (user === undefined) throw new NotFoundException("Username not found");
    else return user; */
    return user;
  }

  async create(dto: any): Promise<any> {
    const user_type = dto.type;
    var user_dto = {};
    var sub_dto = {};

    dto.password = await hash(dto.password, 10);

    for (const [key, value] of Object.entries(dto)) {
      console.log(key);
      if (userprops.includes(key)) user_dto[key] = value;
      else if (user_type === UserType.STUDENT && studentprops.includes(key))
        sub_dto[key] = value;
      else if (user_type === UserType.EMPLOYER && employerprops.includes(key))
        sub_dto[key] = value;
      else throw new NotAcceptableException('Some fields are not defined');
    }

    if (user_type == UserType.STUDENT) {
      const student = { ...new Student(), ...sub_dto };
      student.user = { ...new User(), ...user_dto };
      const {
        ['user']: user,
        ...ret_student
      } = await this.studentService.create(student);
      const { ['username']: un, ['password']: pw, ...rest_user } = user;
      return {
        ...rest_user,
        ...ret_student,
      };
    } else if (user_type == UserType.EMPLOYER) {
      const employer = { ...new Employer(), ...sub_dto };
      employer.user = { ...new User(), ...user_dto };
      const {
        ['user']: user,
        ...ret_employer
      } = await this.employerService.create(employer);
      const { ['username']: un, ['password']: pw, ...rest_user } = user;
      return {
        ...rest_user,
        ...ret_employer,
      };
    }
  }

  async verifyUser(id: number) {
    const user = await this.findById(id);
    user.verified = true;
    return this.userRepo.save(user);
  }

  async update(id: number, dto: any): Promise<any> {
    var user_dto = {};
    var sub_dto = {};

    if (dto.password) {
      dto.password = await hash(dto.password, 10);
    }

    const user_type = (await this.findById(id)).type;

    for (const [key, value] of Object.entries(dto)) {
      if (userprops.includes(key)) user_dto[key] = value;
      else if (user_type === UserType.STUDENT && studentprops.includes(key))
        sub_dto[key] = value;
      else if (user_type === UserType.EMPLOYER && employerprops.includes(key))
        sub_dto[key] = value;
      else throw new NotAcceptableException('Some fields are not defined');
    }

    // cannot change type
    if (dto.type)
      throw new NotAcceptableException('User type is not modifiable');

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

    const { ['username']: un, ['password']: pw, ...rest_user } = ret_user;

    return {
      ...rest_user,
      ...ret_subUser,
    };
  }

  // own guard will do
  async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    await this.userRepo.remove(user);
    return user;
  }

  async getUserJob(id: number) {
    const job = await getRepository(Job)
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.employer', 'employer')
      .where('job.employer.id = :id')
      .setParameter('id', id)
      .getMany();
    return job;
  }

  async getUserContract(id: number) {
    const user = await this.findById(id);
    let contract: Contract[];
    if ((user.type = UserType.STUDENT)) {
      contract = await getRepository(Contract)
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.student', 'student')
        .where('contract.student.id = :id')
        .setParameter('id', id)
        .getMany();
    } else if ((user.type = UserType.STUDENT)) {
      contract = await getRepository(Contract)
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.employer', 'employer')
        .where('contract.employer.id = :id')
        .setParameter('id', id)
        .getMany();
    }
    return contract;
  }

  async getUserRecord(id: number) {
    const user = await this.findById(id);
    if (user.type == UserType.STUDENT) {
      const pending = await getRepository(ApplicationRecord)
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.student', 'student')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .where('application_record.student.id = :id \
          AND application_record.state=1')
        .setParameter('id', id)
        .getMany();
      const waiting = await getRepository(ApplicationRecord)
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.student', 'student')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .where('application_record.student.id = :id \
          AND application_record.state=2')
        .setParameter('id', id)
        .getMany();
      return {
        pending,
        waiting,
      };
    } else if (user.type == UserType.EMPLOYER) {
      const applied = await getRepository('application_record')
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .leftJoinAndSelect('application_record.student', 'student')
        .where('application_record.employer.id = :id \
          AND application_record.state=1')
        .setParameter('id', id)
        .getMany();
      const responded = await getRepository('application_record')
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .leftJoinAndSelect('application_record.student', 'student')
        .where('application_record.employer.id = :id \
          AND application_record.state=3')
        .setParameter('id', id)
        .getMany();
      return {
        applied,
        responded
      }
    }
  }
}
