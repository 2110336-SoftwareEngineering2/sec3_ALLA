import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmployerModule } from './employer/employer.module';
import { StudentModule } from './student/student.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JobModule } from './job/job.module';
import { ApplicationRecordModule } from './application-record/application-record.module';
import { ApplicationRecordLogModule } from './application-record-log/application-record-log.module';
import { ContractModule } from './contract/contract.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [TypeOrmModule.forRoot({
    /*type: 'mysql',
    host: 'nisiter-db.cw61o2wwfwig.us-east-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'alla-project',
    database: 'all_a',*/
    type: 'mysql',
    host: 'mysql',  
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'all_a',

    entities: [join(__dirname, '**/*.entity.{ts,js}')],
    synchronize: true, //auto migration when db schema change

  }), UserModule, AuthModule, EmployerModule, StudentModule, JobModule, ApplicationRecordModule, ApplicationRecordLogModule, ContractModule,
  ConfigModule.forRoot({
    validationSchema:Joi.object({
      AWS_REGION: "us-east-2",
      AWS_ACCESS_KEY_ID: "nKVwNQ6SaKFw6p2pKNQtN0whTbfOodztE59icaiW",
      AWS_SECRET_ACCESS_KEY: "AKIAWSIJ2LLKAE2CEFBF",
      AWS_PUBLIC_BUCKET_NAME: "backend-nisiter",
    })
  })  
],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
