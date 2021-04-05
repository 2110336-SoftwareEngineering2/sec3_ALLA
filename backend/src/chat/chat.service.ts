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
        const room1 = await this.roomService.findPrivateRoom(id1);
        const room2 = await this.roomService.findPrivateRoom(id2);
        const rid1 = String(room1.id);
        const rid2 = String(room2.id);
        this.socket.to(rid1).emit('event', dto);
        this.socket.to(rid2).emit('event', dto);
    }
}
