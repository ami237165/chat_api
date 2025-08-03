import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './adopters/socket-io.adapter';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://chatme-chi-gray.vercel.app'], // Allow all origins (for development only)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(await app.getUrl());
}
bootstrap();
