import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express" 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json())

  app.enableCors({
    origin: '*', // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(8000); 
 
}
bootstrap();