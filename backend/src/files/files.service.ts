import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {PublicFile} from 'src/entities/publicFile.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
 
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private readonly publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService
  ) {}

  
 
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
      
    const s3 = new S3({
        accessKeyId: "AKIAWSIJ2LLKAE2CEFBF",
        secretAccessKey: "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"
      });
    try{
        console.log('Before s3');
        const uploadResult = await s3.upload({
            //Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Bucket: "backend-nisiter",
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
          }).promise();
        console.log('After s3');

        const newFile = this.publicFilesRepository.create({
                key: uploadResult.Key,
                url: uploadResult.Location
            });

        await this.publicFilesRepository.save(newFile);
        console.log('upload done')
        return newFile;
    }
    catch(err){
        throw new Error(`S3 upload error: ${err.message}`)
    }
  }

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOne({ Fid: fileId });
    
    // Delete from S3
    const s3 = new S3({
        accessKeyId: "AKIAWSIJ2LLKAE2CEFBF",
        secretAccessKey: "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"
      });
    await s3.deleteObject({
      Bucket: "backend-nisiter",
      Key: file.key,
    }).promise();

    // Delete from PublicFiles repo
    await this.publicFilesRepository.delete(fileId);
  }
}