import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Room, Message]),
    UserModule
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
