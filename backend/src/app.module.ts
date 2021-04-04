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
import { RoomService } from './room/room/room.service';
import { RoomModule } from './room/room/room.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventLogController } from './event-log/event-log.controller';
import { EventLogService } from './event-log/event-log.service';
import { EventLogModule } from './event-log/event-log.module';
import * as Joi from 'joi';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'admin',
    password: 'alla-project',
    database: 'all_a',
    entities: [join(__dirname, '**/*.entity.{ts,js}')],
    synchronize: true, //auto migration when db schema change
  }), UserModule, AuthModule, EmployerModule, StudentModule, JobModule, ApplicationRecordModule, ApplicationRecordLogModule, ContractModule, RoomModule, ChatModule, EventLogModule
],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
