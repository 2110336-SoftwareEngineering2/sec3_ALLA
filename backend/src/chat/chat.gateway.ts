import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { RoomService } from 'src/room/room/room.service';
import { Server, Socket } from 'socket.io';
import { NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService : RoomService,
    private readonly authService : AuthService,
    private readonly userService : UserService,
    private readonly chatService : ChatService
  ){}

  afterInit(server: any) {
    this.chatService.socket = server;
  }

  async handleDisconnect(client: Socket) {
    //console.log('handshake :',client.handshake.query);
    const token = client.handshake.query.token;
    const { uid } = this.authService.verifyToken(token);
    this.server.emit('users', `User id : ${uid} disconnected`);
    console.log(`User id : ${uid} disconnected`);
  }
 
  async handleConnection(client: Socket, ...args: any[]) {
    //console.log('handshake :',client.handshake.query);
    const token = client.handshake.query.token;
    console.log('token :',token);
    const { uid } = this.authService.verifyToken(token);
    this.server.emit('users', `User id : ${uid} connected`);
    console.log(`User id : ${uid} connected`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any) {
    const dto = payload;
    const token = client.handshake.query.token;
    const { uid } = this.authService.verifyToken(token);
    console.log('author :', uid);
    console.log('received message :', dto)
    await this.roomService.addMessage({...dto, author: uid});
    client.broadcast.to(dto.id).emit('message', dto.content);
  }

  @SubscribeMessage('join')
  async joinChatRoom(client: Socket, payload: any) {
    //console.log('handshake :',client.handshake.query);
    const token = client.handshake.query.token;
    const { uid } = this.authService.verifyToken(token);
    const room = await this.userService.getUserChat(uid);
    const room_list = []
    for (let i=0; i<room.length; i++) { 
      room_list.push(room[i].id)
    }

    client.join(room_list);
    console.log(`user : ${uid} joined chat room`)
    client.emit('message', room);
  }

  async notify(dto: any, room: any) {
    this.server.to(room).emit('event', dto);
  }
}
