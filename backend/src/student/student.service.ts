import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly repo: Repository<Student>,
  ) {}

  async create(dto: Omit<Student, 'sid'>): Promise<Student> {
    const student = { ...new Student(), ...dto };
    return this.repo.save(student);
  }
  
  //for querying
  findById(sid: number): Promise<Student> {
    return this.repo.findOne(sid);
  }

  findByUser(user : User) : Promise<Student> {
    return this.repo.findOne({user});
  }

  async update(user : User, dto: Partial<Omit<Student, 'sid'>>): Promise<Student> {
    const student = { ...(await this.findByUser(user)), ...dto };
    return this.repo.save(student);
  }

  async delete(user : User) {
    const student = await this.findByUser(user);
    await this.repo.remove(student);
    return student;
  }
  
}
