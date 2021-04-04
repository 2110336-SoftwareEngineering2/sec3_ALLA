import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { JobModule } from 'src/job/job.module';
import { UserModule } from 'src/user/user.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  imports : [TypeOrmModule.forFeature([Feedback]), UserModule, JobModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports : [FeedbackService]
})
export class FeedbackModule {}
