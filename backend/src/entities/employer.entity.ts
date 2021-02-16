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
export class Employer {
  @OneToOne((type) => User, { primary: true })
  @JoinColumn({ name: 'id' })
  eid: number;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  fields_of_work: string;
}
