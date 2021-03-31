import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Employer } from './employer.entity';
import { Job } from './job.entity';
import { Student } from './student.entity';
import { User } from './user.entity';

export enum StateNum {
  APPLY = 1,
  OFFER = 2,
  CONFIRM = 3,
  FINISH = 4,
}


@Entity()
@Unique(['student','job'])
export class ApplicationRecord {
  @PrimaryGeneratedColumn()
  rid: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, })
  @JoinColumn()
  employer: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, })
  @JoinColumn()
  student: User;

  @ManyToOne(() => Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true, })
  @JoinColumn()
  job: Job;

  @Column({ default: 1 })
  state: StateNum;

  @Column({ nullable: true })
  yesFlag: boolean;

  @Column()
  timestamp: Date;
}
