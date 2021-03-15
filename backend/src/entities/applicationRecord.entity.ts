import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "./employer.entity";
import { Job } from "./job.entity";
import { Student } from "./student.entity";

type StateNum = 1 | 2 | 3;

@Entity()
export class ApplicationRecord {

    @PrimaryGeneratedColumn()
    rid: number;
    
    @ManyToOne(() => Employer, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    employer : Employer;

    @ManyToOne(() => Student, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    student : Student;

    @ManyToOne(() => Job, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    job : Job;

    @Column()
    state : StateNum;

    @Column()
    ackFlag : boolean;

    @Column()
    yesNoFlag : boolean;

}