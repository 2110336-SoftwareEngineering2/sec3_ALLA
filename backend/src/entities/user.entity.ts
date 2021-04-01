import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn
} from 'typeorm';
import {PublicFile} from 'src/entities/publicFile.entity';

export enum UserType {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  EMPLOYER = 'EMPLOYER',
}

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User { 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('enum', { enum: UserType, default: UserType.STUDENT })
  type: UserType;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;
  
  @Column({default : false})
  verified : boolean;

  @Column()
  birthDate: string;

  @JoinColumn()
  @OneToOne(() => PublicFile, {eager: true, nullable: true})
  avatar?: PublicFile;

}
