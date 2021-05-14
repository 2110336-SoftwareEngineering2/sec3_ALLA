import {
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findById(id: number) {
    const room = await this.roomRepo.findOne(id, {
      relations: ['members', 'message', 'message.author'],
    });
    if (!room) throw new NotFoundException('Chat Room not found');
    return room;
  }

  async findByMember(dto: any) {
    const id1 = dto.id1;
    const id2 = dto.id2;
    console.log(dto);
    const res = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'members')
      .leftJoinAndSelect('room.message', 'message')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('room2.id')
          .from(Room, 'room2')
          .innerJoin('room2.members', 'member')
          .where('member.id = :id1')
          .getQuery();

        return ('room.id IN ' + subQuery + ' AND members.id = :id2');
      })
      .setParameter('id2', id2)
      .setParameter('id1', id1)
      .select('room.id')
      .getMany();

    return res[0];
  }

  async findPrivateRoomById(id: number) {
    const room = await this.findById(id);
    const members = room.members;
    let rooms = []
    for (const user of members) {
      const uid = user.id;
      const privateRoom = await this.findPrivateRoom(uid);
      rooms.push(privateRoom.id);
    }
    return rooms;
  }

  async findPrivateRoom(uid: number) {
    const res = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'members')
      .where('room.privateFlag = TRUE AND members.id = :id')
      .setParameter('id', uid)
      .select('room.id')
      .getOne();

    return res;
  }

  async create(dto: any, privateFlag = false) {
    const room = { ...new Room() };
    let members = [];
    const temp_members = dto.members;
    if (temp_members.length>1) {
      const room = await this.findByMember({id1: temp_members[0],id2: temp_members[1]});
      if (room) throw new NotAcceptableException('Room already exist');
    }
    for (let i = 0; i < dto.members.length; i++) {
      let id = dto.members[i];
      let user = await this.userService.findById(id);
      members.push(user);
    }
    room.members = members;
    room.message = [];
    room.privateFlag = privateFlag;
    return await this.roomRepo.save(room);
  }

  async addMessage(dto: any) {
    let room = await this.findById(dto.id);
    const author = await this.userService.findById(dto.author);
    let valid = false;
    for (let i = 0; i < room.members.length; i++) {
      if (room.members[i].id == author.id) {valid = true; break;}
    }
    if (!valid) throw new NotAcceptableException('User does not have the permission to chat in this room');
    let message = new Message();
    message.timestamp = new Date();
    message.content = dto.content;
    message.room = room;
    message.author = author;
    message = await this.messageRepo.save(message);

    //console.log(message);
    //console.log(room.message);

    room.message = [...room.message, message];
    room = await this.roomRepo.save(room)
    return 'message added';
  }


  async delete(id: number) {
    const room = await this.findById(id);
    await this.roomRepo.remove(room);
    return room;
  }
}
