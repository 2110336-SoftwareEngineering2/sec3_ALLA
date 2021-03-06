import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { OwnGuard } from 'src/guard/own.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): {} {
    return this.service.findById(id);
  }

  @Get('system/check-username')
  checkuser(@Body('username') username : string) {
    return this.service.validUsername(username);
  }

  @Post()
  create(@Body() dto: Omit<User, 'id'>): {} {
    return this.service.create(dto);
  }

  @UseGuards(OwnGuard)
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: {}): {} {
    return this.service.update(id, dto);
  }

  @UseGuards(OwnGuard)
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): {} {
    return this.service.delete(id);
  }
}
