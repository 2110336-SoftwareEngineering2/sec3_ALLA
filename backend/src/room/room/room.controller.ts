import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.roomService.findById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.roomService.create(dto);
  }

  @Post('/message')
  addMessage(@Body() dto: any) {
    return this.roomService.addMessage(dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.roomService.delete(id);
  }

  @Get('/members/id')
  getRoomFromMembers(@Body() dto: any) {
    return this.roomService.findByMember(dto);
  }
}
