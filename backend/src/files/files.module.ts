import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFileController } from './files.controller';
import { FilesService } from './files.service';
import { PublicFile} from 'src/entities/publicFile.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), 
  ConfigModule
  ],
  controllers: [PublicFileController],
  providers: [FilesService],
  exports: [FilesService]
})
export class FileModule {}


