import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "./employer.entity";
import { Job } from "./job.entity";
import { Student } from "./student.entity";
import { User } from "./user.entity";

export enum ContractStatus {
    DOING = "DOING",
    DONE = "DONE",
    RESIGNED = "RESIGNED",
    TIMEOUT = "TIMEOUT",
    SUBMITTED = "SUBMITTED",
    RESIGN_REQ = "RESIGN_REQ"
}

@Entity()
export class Contract {
    
    @PrimaryGeneratedColumn()
    cid: number;

    @ManyToOne(() => User, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    employer : User;

    @ManyToOne(() => User, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    student : User;

    @ManyToOne(() => Job, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    job : Job;

    @Column({type: 'date'})
    start_date: Date;

    @Column('enum', {enum : ContractStatus, default : ContractStatus.DOING})
    status : ContractStatus;

    @Column()
    time_left : number;
}