import { IoAdapter } from '@nestjs/platform-socket.io';
import { Injectable } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

@Injectable()
export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
const cors = {
      origin: 'https://192.168.2.110:3000/', // replace with frontend origin in prod
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
