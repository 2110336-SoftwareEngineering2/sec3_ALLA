import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {FilesService} from 'src/files/files.service';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly repo: Repository<Student>,
    private readonly filesService: FilesService
  ) {}

  async create(dto: Omit<Student, 'sid'>): Promise<Student> {
    const student = { ...new Student(), ...dto };
    return this.repo.save(student);
  }

  async findUserId(sid: number) {
    const student = await this.repo.findOne(sid, {relations : ['user']});
    if (student === undefined) throw new NotFoundException("Student ID not found");
    return student.user.id;
  }
  
  async findById(sid: number): Promise<Student> {
    const student = await this.repo.findOne(sid);
    if (student === undefined) throw new NotFoundException("Student ID not found");
    else return student;
  }

  // handled in user service, guarantee able to find
  findByUser(user : User) : Promise<Student> {
    return this.repo.findOne({user});
  }

  // handled in user service, guarantee able to update
  async update(user : User, dto: Partial<Omit<Student, 'sid'>>): Promise<Student> {
    const student = { ...(await this.findByUser(user)), ...dto };
    return this.repo.save(student);
  }
/*
  async upload_portfolio(imageBuffer: Buffer, filename: string): Promise<any>{
    return  await this.filesService.uploadPublicFile(imageBuffer, filename);
  }
*/
  // do not need ?
  /*
  async delete(user : User) {
    const student = await this.findByUser(user);
    await this.repo.remove(student);
    return student;
  }
  */
  
}
