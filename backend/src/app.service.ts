import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User, UserType } from 'src/entities/user.entity';
import { UserService } from './user/user.service';
import { compare, hash } from 'bcryptjs';
import { Student } from './entities/student.entity';
import { Employer } from './entities/employer.entity';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  getHello(): string {
    this.initializeDB();
    return 'Hello World!';
  }

  async initializeDB() {
    const pw = await hash('test2', 10);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'test2',
          password: pw,
          type: UserType.EMPLOYER,
          email: 'test@example.com',
          firstName: 'fname',
          lastName: 'lname',
          phoneNumber: '+66999999999',
        },
      ])
      .execute();
    
    console.log('user added');
    
    const user = await this.userService.findByUsername('test2');
    
    console.log('user id :', user.id);
/*
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Student)
      .values([
          {
            sid : Number(user.id),
            birthDate: "_",
            university : "Chula",
            degree: "Bachelor",
            faculty : "Eng",
            department : "Com",
            fields_of_work : "something"
        },
      ])
      .execute(); 

    console.log('student added');
  }
*/
await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Employer)
      .values([
          {
            eid : Number(user.id),
            company: "_",
            position: '_',
            fields_of_work: '_'
        },
      ])
      .execute(); 

    console.log('employer added');
  }
}
