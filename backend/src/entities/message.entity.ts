import {
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  room: Room;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  author: User;

  @Column({ length: 255 })
  content: string;

  @Column()
  timestamp: Date;
}
