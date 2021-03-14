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
export class Student {

  @PrimaryGeneratedColumn()
  sid: number;

  @OneToOne(() => User, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
  @JoinColumn()
  user : User; 

  @Column()
  university: string;

  @Column()
  degree: string;

  @Column()
  faculty: string;

  @Column()
  department: string;

  @Column()
  fields_of_work: string;
}
