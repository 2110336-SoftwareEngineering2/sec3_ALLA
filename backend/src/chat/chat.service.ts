import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RoomService } from 'src/room/room/room.service';

@Injectable()
export class ChatService {

    @WebSocketServer()
    public socket: Server  = null;

    constructor(
        private readonly roomService : RoomService
    ) {}
    

    async notify(dto: any, id1: number, id2: number) {
        const room = await this.roomService.findByMember({id1, id2})
        const id = String(room.id);
        this.socket.to(id).emit('event', dto);
    }
}
