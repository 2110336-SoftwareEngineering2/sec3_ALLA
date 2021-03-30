import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationRecord, StateNum } from './applicationRecord.entity';

@Entity()
export class ApplicationRecordLog {
  @PrimaryGeneratedColumn()
  lid: number;

  @ManyToOne(() => ApplicationRecord, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  record: ApplicationRecord;

  @Column('enum', { enum: StateNum, default: StateNum.APPLY })
  state: StateNum;

  @Column({ nullable: true })
  yesFlag: boolean;
}
