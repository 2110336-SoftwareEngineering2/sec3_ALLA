import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.setGlobalPrefix('api');
  

  const options = new DocumentBuilder()
    .setTitle('Nisiter API')
    .setDescription('Nister API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); 

  /* const configService = app.get(ConfigService);
  config.update({
    accessKeyId: "nKVwNQ6SaKFw6p2pKNQtN0whTbfOodztE59icaiW",
    secretAccessKey: "AKIAWSIJ2LLKAE2CEFBF",
    region: "us-east-2",
  }); */

  await app.listen(8300);
}

bootstrap();
