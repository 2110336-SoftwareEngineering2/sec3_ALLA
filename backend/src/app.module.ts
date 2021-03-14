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
import { ApplicationRecordService } from './application-record/application-record.service';
import { ApplicationRecordController } from './application-record/application-record.controller';
import { ApplicationRecordModule } from './application-record/application-record.module';

 
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'all_a',
    entities: [join(__dirname, '**/*.entity.{ts,js}')],
    synchronize: true, //auto migration when db schema change
  }), UserModule, AuthModule, EmployerModule, StudentModule, JobModule, ApplicationRecordModule
],
  controllers: [AppController, ApplicationRecordController],
  providers: [AppService, ApplicationRecordService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
