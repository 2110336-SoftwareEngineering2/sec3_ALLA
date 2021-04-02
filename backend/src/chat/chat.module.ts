import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RoomModule } from 'src/room/room/room.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
    imports: [AuthModule, RoomModule, UserModule],
    providers : [ChatGateway, ChatService],
    exports : [ChatService]
})

export class ChatModule {}
