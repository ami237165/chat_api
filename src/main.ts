import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './adopters/socket-io.adapter';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'https://chatme-chi-gray.vercel.app',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  );
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(await app.getUrl());
}
bootstrap();
