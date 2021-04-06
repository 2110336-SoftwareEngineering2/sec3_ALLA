import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/entities/user.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { Student } from 'src/entities/student.entity';
import { Employer } from 'src/entities/employer.entity';
import { StudentService } from 'src/student/student.service';
import { EmployerService } from 'src/employer/employer.service';
import { Job } from 'src/entities/job.entity';
import { Contract } from 'src/entities/contract.entity';
import { ApplicationRecord } from 'src/entities/applicationRecord.entity';
import { Room } from 'src/entities/room.entity';
import { FilesService } from 'src/files/files.service';
import { RoomService } from 'src/room/room/room.service';
import { Feedback } from 'src/entities/feedback.entity';


const userprops = [
  'username',
  'password',
  'type',
  'email',
  'firstName',
  'lastName',
  'phoneNumber',
  'birthDate',
];
const studentprops = [
  'university',
  'degree',
  'faculty',
  'department',
  'fields_of_work',
];
const employerprops = ['company', 'position', 'fields_of_work'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly studentService: StudentService,
    private readonly employerService: EmployerService,
    private readonly fileService: FilesService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
    
  ) {}

  async validUsername(username: string): Promise<Boolean> {
    const user = await this.userRepo.findOne({ username });
    return user !== undefined;
  }

  async validEmail(email: string): Promise<Boolean> {
    const user = await this.userRepo.findOne({ email });
    return user !== undefined;
  }

  async findById(id: number): Promise<any> {
    const user = await this.userRepo.findOne(id);
    if (user === undefined) throw new NotFoundException('User not found');
    const subUser =
      user.type == UserType.STUDENT
        ? await this.studentService.findByUser(user)
        : await this.employerService.findByUser(user);
    const { ['username']: un, ['password']: pw, ...rest } = user;
    return {
      ...rest,
      ...subUser,
    };
  }

  async deleteProfilePic(userId: number){
    const person = await this.findById(userId);
    await this.userRepo.update(userId,{profilePic:null});
    this.fileService.deletePublicFile(person.profilePic.Fid);
  }

  async addProfilePic(userId: number, imageBuffer: Buffer, filename: string) {

    const person = await this.findById(userId);

    if(person.profilePic){
      console.log('already has profile picture, deleting old one...');
      this.deleteProfilePic(userId);
      console.log('delete done');
    }

    console.log('upload...')
    const avatar =  this.fileService.uploadPublicFile(imageBuffer, filename);
    
    await this.userRepo.update(userId, { profilePic: (await avatar)});
    return avatar;
    /*
    if (mode == 'profile'){
      await this.userRepo.update(userId, { profilePic: (await avatar)});
      return avatar;
    }
    else if (mode == 'resume' && person.type == UserType.STUDENT){
      await this.studentService.add_to_repo(person.sid, (await avatar));
      return avatar
    }*/
  }

  async get_profileURL(uid:number): Promise<string>{
    return (await this.userRepo.findOne({id:uid})).profilePic.url
  }


  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ username });
    /* if (user === undefined) throw new NotFoundException("Username not found");
    else return user; */
    return user;
  }

  async create(dto: any): Promise<any> {
    const user_type = dto.type;
    var user_dto = {};
    var sub_dto = {};

    dto.password = await hash(dto.password, 10);

    for (const [key, value] of Object.entries(dto)) {
      if (userprops.includes(key)) user_dto[key] = value;
      else if (user_type === UserType.STUDENT && studentprops.includes(key))
        sub_dto[key] = value;
      else if (user_type === UserType.EMPLOYER && employerprops.includes(key))
        sub_dto[key] = value;
      else throw new NotAcceptableException('Some fields are not defined');
    }

    if (user_type == UserType.STUDENT) {
      const student = { ...new Student(), ...sub_dto };
      student.user = { ...new User(), ...user_dto };
      const {
        ['user']: user,
        ...ret_student
      } = await this.studentService.create(student);
      const { ['username']: un, ['password']: pw, ...rest_user } = user;
      await this.roomService.create({
        members:[user.id],
        privateFlag: true
      }, true);
      console.log('private room created');
      return {
        ...rest_user,
        ...ret_student,
      };
    } else if (user_type == UserType.EMPLOYER) {
      const employer = { ...new Employer(), ...sub_dto };
      employer.user = { ...new User(), ...user_dto };
      const {
        ['user']: user,
        ...ret_employer
      } = await this.employerService.create(employer);
      const { ['username']: un, ['password']: pw, ...rest_user } = user;
      await this.roomService.create({
        members:[user.id],
      }, true);
      console.log('private room created');
      return {
        ...rest_user,
        ...ret_employer,
      };
    }
  }

  async verifyUser(id: number) {
    const user = await this.findById(id);
    user.verified = true;
    return this.userRepo.save(user);
  }

  async update(id: number, dto: any): Promise<any> {
    var user_dto = {};
    var sub_dto = {};

    if (dto.password) {
      dto.password = await hash(dto.password, 10);
    }

    const user_type = (await this.findById(id)).type;

    for (const [key, value] of Object.entries(dto)) {
      if (userprops.includes(key)) user_dto[key] = value;
      else if (user_type === UserType.STUDENT && studentprops.includes(key))
        sub_dto[key] = value;
      else if (user_type === UserType.EMPLOYER && employerprops.includes(key))
        sub_dto[key] = value;
      else throw new NotAcceptableException('Some fields are not defined');
    }

    // cannot change type
    if (dto.type)
      throw new NotAcceptableException('User type is not modifiable');

    const user = { ...(await this.findById(id)), ...user_dto };
    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }
    const ret_user = await this.userRepo.save(user);
    console.log('user updated');

    const ret_subUser =
      user.type == UserType.STUDENT
        ? await this.studentService.update(user, sub_dto)
        : await this.employerService.update(user, sub_dto);
    console.log('subuser updated');

    const { ['username']: un, ['password']: pw, ...rest_user } = ret_user;

    return {
      ...rest_user,
      ...ret_subUser,
    };
  }

  // own guard will do
  async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    await this.userRepo.remove(user);
    return user;
  }

  //--------------------------------------- QUERY PART ---------------------------------------

  async getUserJobManagementData(id: number) {
    const job = await this.getUserJob(id);
    const record = await this.getUserRecord(id);
    const contract = await this.getUserContract(id);
    const feedback = await this.getUserFeedback(id);
    const user = await this.findById(id);

    return user.type == UserType.STUDENT ?
      {record, contract, feedback} : {job, record, contract}
  }

  async getUserJob(id: number) {
    const job = await getRepository(Job)
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.employer', 'employer')
      .where('job.employer.id = :id')
      .setParameter('id', id)
      .getMany();
    return job;
  }

  async getUserChat(id: number) {
    const res = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'members')
      .leftJoinAndSelect('room.message', 'message')
      .leftJoinAndSelect('message.author', 'author')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('room2.id')
          .from(Room, 'room2')
          .innerJoin('room2.members', 'member')
          .where('member.id = :id', {id: id})
          .getQuery();

        return ('room.id IN ' + subQuery);
      })
      .orderBy('message.timestamp', 'ASC')
      .getMany();

    return res;
  }

  async getUserChatRoom(id: number) {
    //const room = await this.userRepo.findOne(id, {relations:['members']});
    const room = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'members')
      .leftJoinAndSelect('room.message', 'message')
      .where('members.id = :id')
      .setParameter('id', id)
      .select(['room.id'])
      .getMany();

    return room;
  }

  async getUserContract(id: number) {
    const user = await this.findById(id);
    let contract: Contract[];
    if (user.type == UserType.STUDENT) {
      contract = await getRepository(Contract)
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.student', 'student')
        .leftJoinAndSelect('contract.employer', 'employer')
        .leftJoinAndSelect('contract.job', 'job')
        .where('contract.student.id = :id')
        
        .select([
          'contract.cid',
          'contract.status',
          'employer.id',
          'employer.firstName',
          'employer.lastName',
          'student.id',
          'student.firstName',
          'student.lastName',
          'job.companyName',
          'job.companyPicUrl',
          'job.jid',
          'job.jobTitle',
          'job.location',
          'job.duration',
          'contract.start_date',
          'contract.time_left'
        ])
        
        .setParameter('id', id)
        .orderBy('contract.status')
        .getMany();
    } else if (user.type == UserType.EMPLOYER) {
      contract = await getRepository(Contract)
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.student', 'student')
        .leftJoinAndSelect('contract.employer', 'employer')
        .leftJoinAndSelect('contract.job', 'job')
        .where('contract.employer.id = :id')
        
        .select([
          'contract.cid',
          'contract.status',
          'employer.id',
          'employer.firstName',
          'employer.lastName',
          'student.id',
          'student.firstName',
          'student.lastName',
          'job.companyName',
          'job.companyPicUrl',
          'job.jid',
          'job.jobTitle',
          'job.location',
          'job.duration',
          'contract.start_date',
          'contract.time_left'
        ])
        
        .setParameter('id', id)
        .orderBy('contract.status')
        .getMany();
    }
    return contract;
  }

  async getUserFeedback(id: number){
    const user = await this.findById(id);
    if (user.type == UserType.STUDENT) {
      const feedback = await getRepository(Feedback)
        .createQueryBuilder('feedback')
        .leftJoinAndSelect('feedback.student', 'student')
        .leftJoinAndSelect('feedback.employer', 'employer')
        .leftJoinAndSelect('feedback.job','job')
        // .leftJoinAndSelect('feedback.contract', 'contract')
        .where('feedback.student.id = :id')

        .select([
          'feedback.fid',
          'feedback.finished_date',
          'feedback.time_used',
          'feedback.rate',
          'feedback.comment',
          // 'contract.cid',
          // 'contract.status',
          'employer.id',
          'employer.firstName',
          'employer.lastName',
          'student.id',
          'student.firstName',
          'student.lastName',
          'job.companyName',
          'job.companyPicUrl',
          'job.jid',
          'job.jobTitle',
          'job.location',
          'job.duration',
        ])
        
        .setParameter('id', id)
        .orderBy('feedback.finished_date')
        .getMany();

        return feedback;
    }
  }

  async getUserRecord(id: number) {
    const user = await this.findById(id);
    if (user.type == UserType.STUDENT) {
      const pending = await getRepository(ApplicationRecord)
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.student', 'student')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .leftJoinAndSelect('application_record.job', 'job')
        .where(
          'application_record.student.id = :id \
          AND application_record.state=1',
        )
        /* .select([
          'application_record.rid',
          'application_record.state',
          'application_record.yesFlag',
          'application_record.timestamp',
          'application_record.student',
          'employer.id',
          'employer.firstName',
          'employer.lastName',
          'employer.phoneNumber',
          'employer.email',
          'job.jid'
        ]) */
        .setParameter('id', id)
        .getMany();
      const waiting = await getRepository(ApplicationRecord)
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.student', 'student')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .leftJoinAndSelect('application_record.job', 'job')
        .where(
          'application_record.student.id = :id \
          AND application_record.state=2',
        )
        /* .select([
          'application_record.rid',
          'application_record.state',
          'application_record.yesFlag',
          'application_record.timestamp',
          'application_record.student',
          'employer.id',
          'employer.firstName',
          'employer.lastName',
          'employer.phoneNumber',
          'employer.email',
          'job.jid'
        ]) */
        .setParameter('id', id)
        .getMany();
      return {
        pending,
        waiting,
      };
    } else if (user.type == UserType.EMPLOYER) {
      const applied = await getRepository('application_record')
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .leftJoinAndSelect('application_record.student', 'student')
        .leftJoinAndSelect('application_record.job', 'job')
        .where(
          'application_record.employer.id = :id \
          AND application_record.state=1',
        )
        /* .select([
          'application_record.rid',
          'application_record.state',
          'application_record.yesFlag',
          'application_record.timestamp',
          'application_record.student',
          'student.id',
          'student.firstName',
          'student.lastName',
          'student.phoneNumber',
          'student.email',
          'job.jid'
        ]) */
        .setParameter('id', id)
        .getMany();
      const waiting = await getRepository('application_record')
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .leftJoinAndSelect('application_record.student', 'student')
        .leftJoinAndSelect('application_record.job', 'job')
        .where(
          'application_record.employer.id = :id \
          AND application_record.state=2',
        )
        /* .select([
          'application_record.rid',
          'application_record.state',
          'application_record.yesFlag',
          'application_record.timestamp',
          'application_record.student',
          'student.id',
          'student.firstName',
          'student.lastName',
          'student.phoneNumber',
          'student.email',
          'job.jid'
        ]) */
        .setParameter('id', id)
        .getMany();
      const responded = await getRepository('application_record')
        .createQueryBuilder('application_record')
        .leftJoinAndSelect('application_record.employer', 'employer')
        .leftJoinAndSelect('application_record.student', 'student')
        .leftJoinAndSelect('application_record.job', 'job')
        .where(
          'application_record.employer.id = :id \
          AND application_record.state=3',
        )
        /* .select([
          'application_record.rid',
          'application_record.state',
          'application_record.yesFlag',
          'application_record.timestamp',
          'application_record.student',
          'student.id',
          'student.firstName',
          'student.lastName',
          'student.phoneNumber',
          'student.email',
          'job.jid'
        ]) */
        .setParameter('id', id)
        .getMany();
      return {
        applied,
        waiting,
        responded,
      };
    }
  }
}
