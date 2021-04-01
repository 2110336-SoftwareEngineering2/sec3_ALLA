import {
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
    private readonly userService: UserService,
  ) {}

  async findById(id: number) {
    const room = await this.roomRepo.findOne(id, {
      relations: ['members', 'message'],
    });
    if (!room) throw new NotFoundException('Chat Room not found');
    return room;
  }

  async create(dto: any) {
    const room = { ...new Room() };
    let members = [];
    for (let i = 0; i < dto.members.length; i++) {
      let id = dto.members[i];
      let user = await this.userService.findById(id);
      members.push(user);
    }
    room.members = members;
    room.message = [];
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

    console.log(message);
    console.log(room.message);

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
