import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './adopters/socket-io.adapter';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
   const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "../src/ssl", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../src/ssl", "cert.pem")),
};
  const app = await NestFactory.create(AppModule,{httpsOptions});
  app.enableCors({
    origin: '*', // Allow all origins (for development only)
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  await app.listen(5000);
  console.log(await app.getUrl());
  
}
bootstrap();
