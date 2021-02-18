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
<<<<<<< HEAD
  @PrimaryGeneratedColumn()
=======
  @OneToOne((type) => User, { primary: true , onDelete:'CASCADE'})
  @JoinColumn({ name: 'id' })
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
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
