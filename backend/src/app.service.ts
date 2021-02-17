import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User, UserType } from 'src/entities/user.entity';
import { UserService } from './user/user.service';
import { compare, hash } from 'bcryptjs';
import { Student } from './entities/student.entity';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  getHello(): string {
    this.initializeDB();
    return 'Hello World!';
  }

  async initializeDB() {
    const pw = await hash('xxx', 10);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'xxx',
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
    const user = await this.userService.findByUsername('xxx');
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Student)
      .values([
          {
            sid : Number(user.id),
            birthDate: "11/11/1999",
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
}
