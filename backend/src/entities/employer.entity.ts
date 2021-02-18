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
  @OneToOne((type) => User, { primary: true , onDelete:'CASCADE'})
  @JoinColumn({ name: 'id' })
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
