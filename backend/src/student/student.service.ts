import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
<<<<<<< HEAD
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
  
=======
    @InjectRepository(Student) private readonly student_repo: Repository<Student>,
    private readonly userService: UserService,
  ) {}

  get_all(){
    return this.student_repo.find();
  }

  findById(sid:number){
    return this.student_repo.findOne(sid);
  }

  async create(dto: Student){
    if(await this.userService.get_type(dto.sid)!='STUDENT'){
      return "Invalid Role"
    }
    if(this.userService.findById(dto.sid)){
      const student = { ...new Student(), ...dto};
      this.student_repo.save(student);
      console.log(`sid ${dto.sid} is registered`)
      return student
    }
    else{
      throw new BadRequestException( "Invalid SID")
    }
  }
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
}
