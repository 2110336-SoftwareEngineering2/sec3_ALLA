import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "./employer.entity";
import { Job } from "./job.entity";
import { Student } from "./student.entity";

type contractStatus = 'DOING' | 'DONE' | 'RESIGN';

@Entity()
export class JobContract {
    
    @PrimaryGeneratedColumn()
    cid: number;

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
    status : contractStatus;
    
}