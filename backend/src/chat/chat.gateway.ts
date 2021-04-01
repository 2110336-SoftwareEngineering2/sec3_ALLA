import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { RoomService } from 'src/room/room/room.service';
import { Server, Socket } from 'socket.io';
import { NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@WebSocketGateway(1080)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService : RoomService,
    private readonly authService : AuthService,
    private readonly userService : UserService
  ){}

  async handleDisconnect(client: Socket) {
    const token = client.handshake.auth.token;
    const { uid } = await this.authService.verifyToken(token);
    this.server.emit('users', `User id : ${uid} disconnected`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.auth.token;
    const { uid } = await this.authService.verifyToken(token);
    this.server.emit('users', `User id : ${uid} connected`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any) {
    const dto = payload[0]
    await this.roomService.addMessage(dto);
    client.broadcast.to(dto.id).emit('message', dto.content);
  }

  @SubscribeMessage('join')
  async joinChatRoom(client: Socket, payload: any) {
    const dto = payload[0];
    const room = await this.userService.getUserChat(dto.uid);
    const room_list = []
    for (let i=0; i<room.length; i++) {
      room_list.push(room[i].id)
    }

    client.join(room_list);
    client.emit('message', room);
  }
}
