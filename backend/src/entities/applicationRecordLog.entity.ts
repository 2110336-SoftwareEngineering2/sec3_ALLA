import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationRecord } from "./applicationRecord.entity";
import { Employer } from "./employer.entity";
import { Job } from "./job.entity";
import { Student } from "./student.entity";

type stateNum = 1 | 2 | 3;

@Entity()
export class ApplicationRecordLog {

    @PrimaryGeneratedColumn()
    lid: number;

    @ManyToOne(() => Employer, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    employer : Employer;

    @ManyToOne(() => Student, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    student : Student;

    @ManyToOne(() => Job, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    job : Job;

    @ManyToOne(() => ApplicationRecord, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    record : ApplicationRecord;

    @Column()
    state : stateNum;

    @Column()
    ackFlag : boolean;

    @Column()
    timestamp : Date;
}