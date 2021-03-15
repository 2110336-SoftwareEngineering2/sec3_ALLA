import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "./employer.entity";

type JobStatus = 'OPEN' | 'CLOSE'

@Entity()
export class Job {

    @PrimaryGeneratedColumn()
    jid: number;

    @Column()
    companypic_url : string;

    @Column()
    companyName : string;

    @Column()
    jobtitle : string;

    @Column()
    location : string;

    @Column()
    minimumEducation : string;

    @Column()
    workinghours : string;

    @Column()
    salarymin : number;

    @Column()
    salarymax : number;

    @Column()
    positionLeft : number;

    @Column()
    description : string;

    @Column()
    responsibility : string;

    @Column()
    requirement : string;

    @ManyToOne(() => Employer, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    employer : Employer;

    @Column()
    status : JobStatus;

    @Column()
    createdDate : Date;

}