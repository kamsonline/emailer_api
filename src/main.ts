import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/v1/api');

  const config = new DocumentBuilder()
    .setTitle('Email Sender')
    .setDescription('API to send email based on multiple provider availability')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
