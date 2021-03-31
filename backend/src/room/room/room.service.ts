import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Room } from 'src/entities/room.entity';
import { UserType } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly userService: UserService
  ) {}

  async findById(id : number) {
      const room = await this.roomRepo.findOne(id);
      if (!room) throw new NotFoundException('Chat Room not found');
      return room;
  }

  async create(dto: any){
    const room = {...new Room()}
    const employer = await this.userService.findById(dto.eid);
    const student = await this.userService.findById(dto.sid);
    if (employer.type !== UserType.EMPLOYER || student.type !== UserType.STUDENT) throw new NotAcceptableException('Invalid student or employuer id');
    room.message = [];
    return await this.roomRepo.save(room);
  }

  async addMessage(dto: any){
    let room = await this.findById(dto.id);
    const author = await this.userService.findById(dto.author);
    let message = new Message();
    message.timestamp = new Date();
    message.content = dto.content;
    message.room = room;
    message.author = author;
    message = await this.messageRepo.save(message);

    room.message = [...room.message, message];
    return await this.roomRepo.save(room);
  }

  async delete(id : number) {
      const room = await this.findById(id);
      await this.roomRepo.remove(room);
      return room;
  }
  
}
