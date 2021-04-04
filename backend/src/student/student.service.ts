import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {FilesService} from 'src/files/files.service';
import { PublicFile } from 'src/entities/publicFile.entity';


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

  async delete_resume(sid:number){
    const person = await this.findById(sid);
    await this.repo.update(sid, {resume:null});
    this.filesService.deletePublicFile(person.resume.Fid);
  }

  async addResume(sid: number, imageBuffer: Buffer, filename: string){
    const person = await this.findById(sid);

    if(person.resume){
      console.log('already has resume, deleting old one...');
      this.delete_resume(sid);
      console.log('delete done');
    }
    console.log('upload...');
    const avatar = this.filesService.uploadPublicFile(imageBuffer, filename);

    await this.repo.update(sid, {resume: (await avatar)});
    return avatar;
  }

  /*
  async add_to_repo(sid: number, avatar: PublicFile) : Promise<any> {
    this.repo.update(sid, {resume: avatar})
  }*/

  async get_resumeURL(sid:number) : Promise<string>{
    return (await this.repo.findOne({sid:sid})).resume.url;
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
