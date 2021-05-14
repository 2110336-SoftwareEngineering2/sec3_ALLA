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

import { Student } from 'src/entities/student.entity';
import {PublicFile} from 'src/entities/publicFile.entity';
import {FilesService} from 'src/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@ Controller('publicfile')
export class PublicFileController{
    constructor(
        private readonly fileservice : FilesService,
    ){}
/*
    @Post('hard_upload/:uid')
    @UseInterceptors(FileInterceptor('file'))
    async upload_file(
        @Param('uid', new ParseIntPipe()) uid: number,
        @UploadedFile() file: Express.Multer.File) : Promise<any>{
            return this.userservice.addAvatar(uid, file.buffer, file.originalname)
    }
*/

}
