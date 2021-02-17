import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from 'src/entities/employer.entity';
import { UserModule } from 'src/user/user.module';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employer]), UserModule],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService]
})
export class EmployerModule {}
