import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly repo: Repository<Student>,
    private readonly userService: UserService,
  ) {}

  async create(dto: Omit<Student, 'sid'>): Promise<Student> {
    const student = { ...new Student(), ...dto };
    return this.repo.save(student);
  }
  
  //for querying
  findById(sid: number): Promise<Student> {
    return this.repo.findOne(sid);
  }

  async update(sid: number, dto: Partial<Omit<Student, 'sid'>>): Promise<Student> {
    const student = { ...(await this.findById(sid)), ...dto };
    return this.repo.save(student);
  }

  async delete(sid: number) {
    const student = await this.findById(sid);
    await this.repo.remove(student);
    return student;
  }
}
