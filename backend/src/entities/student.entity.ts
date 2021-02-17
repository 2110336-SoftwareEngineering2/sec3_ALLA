import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Student {
  @OneToOne((type) => User, { primary: true })
  @JoinColumn({ name: 'id' })
  sid: number;

  @Column()
  birthDate: string;

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
