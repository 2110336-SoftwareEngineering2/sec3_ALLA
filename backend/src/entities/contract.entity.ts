import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "./employer.entity";
import { Job } from "./job.entity";
import { Student } from "./student.entity";
import { User } from "./user.entity";

export enum ContractStatus {
    DOING = "DOING",
    DONE = "DONE",
    RESIGN = "RESIGN"
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

    @Column('enum', {enum : ContractStatus, default : ContractStatus.DOING})
    status : ContractStatus;
    
}