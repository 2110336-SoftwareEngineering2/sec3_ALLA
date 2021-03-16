import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "./employer.entity";
import { User } from "./user.entity";


export enum JobStatusType{
    OPEN = 'OPEN',
    CLOSE = 'CLOSE'
}

@Entity()
export class Job {

    @PrimaryGeneratedColumn()
    jid: number;

    @Column({default : 'None'})
    companyPicUrl : string;

    @Column()
    companyName : string;

    @Column()
    jobTitle : string;

    @Column({length : 255})
    location : string;

    @Column()
    minimumEducation : string;

    @Column()
    workingHours : string;

    @Column()
    salaryMin : number;

    @Column()
    salaryMax : number;

    @Column()
    positionLeft : number;

    @Column({length : 255})
    description : string;

    @Column({length : 255})
    responsibility : string;

    @Column({length : 255})
    requirement : string;

    @ManyToOne(() => User, {onDelete : 'CASCADE', onUpdate : 'CASCADE', cascade : true})
    @JoinColumn()
    employer : User;

    @Column('enum', {enum: JobStatusType})
    status : JobStatusType;
 
    @Column({type : "date"})
    createdDate : Date;

    @Column('simple-array')
    tagList: string[];

} 