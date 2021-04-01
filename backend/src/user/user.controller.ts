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
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { OwnGuard } from 'src/guard/own.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Req, UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('user')
@ApiBearerAuth('JWT')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): {} {
    return this.service.findById(id);
  }

  @Post('check-username')
  checkUser(@Body('username') username : string) {
    return this.service.validUsername(username);
  }

  @Post('check-email')
  checkEmail(@Body('email') email : string){
    return this.service.validEmail(email);
  }

  @Post()
  create(@Body() dto: Omit<User, 'id'>): {} {
    console.log('test');
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

  @UseGuards(OwnGuard)
  @Get('jobManagement/:id')
  getAllJob(@Param('id', new ParseIntPipe()) id: number){
    return this.service.getUserJobManagementData(id);
  }

  @Post('upload/profile_pic/:uid')
  @UseInterceptors(FileInterceptor('file'))
  async upload_profile(
      @Param('uid', new ParseIntPipe()) uid: number,
      @UploadedFile() file: Express.Multer.File) : Promise<any>{
        console.log(`user id : ${uid} is uploading profile pic`);
        return this.service.addAvatar(uid, file.buffer, file.originalname, 'profile')
  }

  @Post('upload/resume/:uid')
  @UseInterceptors(FileInterceptor('file'))
  async upload_resume(
      @Param('uid', new ParseIntPipe()) uid: number,
      @UploadedFile() file: Express.Multer.File) : Promise<any>{
        console.log(`user id : ${uid} is uploading resume`);
        return this.service.addAvatar(uid, file.buffer, file.originalname, 'resume')
  }

  @Get('profile_pic')
  async get_profile_pic(@Body('uid', new ParseIntPipe()) uid : number): Promise<string>{
    return this.service.get_profileURL(uid);
  }


}
