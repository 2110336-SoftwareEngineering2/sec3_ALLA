import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User, UserType } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Get('get-all-user')
  get_all_user(){
      return this.user_service.get_all();
  }

  @Get('get-a-user/:id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.user_service.findById(id);
  }

  @Get('get-type/:id')
  get_type(@Param('id') id:number){
      return this.user_service.get_type(id)
  }

  @Post()
  create(@Body() dto: Omit<User, 'id'>): Promise<User> {
    return this.user_service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: {}): {} {
    return this.user_service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.user_service.delete(id);
  }


}
