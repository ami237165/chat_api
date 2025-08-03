import { IoAdapter } from '@nestjs/platform-socket.io';
import { Injectable } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

@Injectable()
export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
const cors = {
      origin: process.env.CLIENT_URL, // replace with frontend origin in prod
      methods: ['GET', 'POST'],
      credentials: true,
    };
    const server = super.createIOServer(port, {
      ...options,
      cors,
      maxHttpBufferSize: 150e6, // 15 MB (default is 1 MB)
    });
    return server;
  }
}
