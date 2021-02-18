import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly student_repo: Repository<Student>,
    @InjectRepository(Student) private readonly user_repo: Repository<User>
  ) {}

  async create(dto:Student) : Promise<Student>{
    if(await this.get_type(dto.sid)!='STUDENT'){
      throw new BadRequestException( "Invalid Role")
    }
    if(this.findById(dto.sid)){
      const student = { ...new Student(), ...dto};
      this.student_repo.save(student);
      console.log(`sid ${dto.sid} is registered`)
      return student
    }
    else{
      throw new BadRequestException( "Invalid SID")
    }

  }
  
  //for querying
  async get_type(id:number){
    const x = await this.user_repo.findOne(id);
    console.log(x);
    return x['type']
  }

  get_all(){
    return this.student_repo.find();
  }

  findById(sid: number): Promise<Student> {
    return this.student_repo.findOne(sid);
  }

  findByUser(user : User) : Promise<Student> {
    return this.student_repo.findOne({user});
  }

  async update(user : User, dto: Partial<Omit<Student, 'sid'>>): Promise<Student> {
    const student = { ...(await this.findByUser(user)), ...dto };
    return this.student_repo.save(student);
  }

  async delete(user : User) {
    const student = await this.findByUser(user);
    await this.student_repo.remove(student);
    return student;
  }
}
