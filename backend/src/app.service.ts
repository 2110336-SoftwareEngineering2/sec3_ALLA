import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User, UserType } from 'src/entities/user.entity';
import { UserService } from './user/user.service';
import { compare, hash } from 'bcryptjs';


@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  getHello(): string {
    this.initializeDB();
    return 'Hello World!';
  }

  async initializeDB() {
    const pw = await hash('test2',10);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'test2',
          password:  pw,
          type: UserType.EMPLOYER,
          email: 'test@example.com',
          firstName: 'fname',
          lastName: 'lname',
          phoneNumber: '+66999999999',
        },
      ])
      .execute();

      
    console.log('user added');
  }
}
