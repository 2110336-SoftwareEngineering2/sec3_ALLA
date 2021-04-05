import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "./contract.entity";
import { Job } from "./job.entity";
import { User } from "./user.entity";

@Entity()
export class Feedback {

    @PrimaryGeneratedColumn()
    fid: number;

    @ManyToOne(() => User, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    employer : User;

    @ManyToOne(() => User, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    student : User;

    @ManyToOne(() => Job, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    job : Job;
/*
    @OneToOne(() => Contract, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    contract : Contract;
*/
    @Column({type: 'date'})
    finished_date : Date;

    @Column()
    time_used : number;

    @Column()
    rate : number;
    
    @Column({length : 2047})
    comment : String;

}