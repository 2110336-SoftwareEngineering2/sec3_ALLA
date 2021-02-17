import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  eid: number;

  @OneToOne(() => User, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
  @JoinColumn()
  user : User;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  fields_of_work: string;
}
