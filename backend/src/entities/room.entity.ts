import {
  Column,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Entity,
  JoinTable,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Message, message => message.room)
  message: Message[]

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

}
