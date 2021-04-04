import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './job.entity';
import { User } from './user.entity'; 

export enum EventNum {
    APPLLICATION = 1,
    OFFER = 2,
    OFFER_RESPONSE = 3,
    CONTRACT_CREATED = 4,
    SUBMISSION = 5,
    SUBMISSION_RESPONSE = 6,
    TIMEOUT = 7,
    RESIGNATION_REQUEST = 8,
    RESIGNATION_RESPONSE = 9
  }


@Entity()
export class EventLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  employer: User;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  student: User;

  @ManyToOne(() => Job, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  job: Job;

  @Column()
  state: EventNum;

  @Column()
  timestamp: Date;

  @Column({nullable: true})
  addition: Boolean;
}
