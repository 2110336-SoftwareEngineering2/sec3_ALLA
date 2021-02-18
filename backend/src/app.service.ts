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
    const pw = await hash('testt1', 10);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'testt1',
          password: pw,
          type: UserType.EMPLOYER,
          email: 'test@example.com',
          firstName: 'fname',
          lastName: 'lname',
          phoneNumber: '+66999999999',
        },
      ])
      .execute();

    console.log('user 1 added (employer)');

    const user1 = await this.userService.findByUsername('testt1');

    console.log('user 1 id :', user1.id);

    // ------------------

    const pw2 = await hash('testt2', 10);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'testt2',
          password: pw2,
          type: UserType.STUDENT,
          email: 'test@example.com',
          firstName: 'fname',
          lastName: 'lname',
          phoneNumber: '+66999999999',
        },
      ])
      .execute();

    console.log('user 2 added (student)');

    const user2 = await this.userService.findByUsername('testt2');

    console.log('user 2 id :', user2.id);
    
    // ------------------
    
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Student)
      .values([
          {
            sid : Number(user2.id),
            user : user2,
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
  
    // ------------------

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Employer)
      .values([
        {
          company: '_',
          user : user1,
          position: '_',
          fields_of_work: '_',
        },
      ])
      .execute();

    console.log('employer added');
  }
}
