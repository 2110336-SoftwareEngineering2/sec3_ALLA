<<<<<<< HEAD
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
import { User } from 'src/entities/user.entity';
=======
import { Controller, Post, Body, Headers, Get, Delete, Param} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
import { UserService } from './user.service';

@Controller('user')
export class UserController {
<<<<<<< HEAD
  constructor(private readonly service: UserService) {}

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: Omit<User, 'id'>): Promise<User> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: {}): {} {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.service.delete(id);
  }
=======

    constructor(
        private user_service:UserService, 
    ){}

    @Get('get-all-user')
    get_all_user(){
        return this.user_service.get_all();
    }

    @Get('get-a-user/:id')
    get_a_user(
        @Param('id') id:number
    ){
        return this.user_service.findById(id)
    }

    @Get('get-type/:id')
    get_type(
        @Param('id') id:number
    ){
        return this.user_service.get_type(id)
    }


    @Post()
    async create_user(
        @Body() dto:Omit<User, 'id'>
    )
    {
        const user = await this.user_service.create(dto);
        console.log('New user regsitered');
        console.log(user);
    }

    @Delete()
    Delete_user_by_id(
        @Body("id") id:number 
    )
    {
        if (this.user_service.findById(id)){
            this.user_service.delete(id);
            console.log("This ID is deleted");
        }
        else{
            console.log("No such user")
            return
        }
    }
>>>>>>> 01e3bd7... Create user, employer, student, and basic get
}
