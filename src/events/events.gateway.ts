import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dtos/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  roomId = 'testroomid';
  //online users
  private onlineUsers = new Map();

  handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      this.onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} online with ${socket.id}`);
    }
    console.log('peopples online inside ,', this.onlineUsers);

    socket.on('disconnect', (reason) => {
      console.error(`❌ Socket ${socket.id} disconnected due to:`, reason);
    });
    // 2️⃣ If receiver is online, get their socket
  }

  // handleDisconnect(socket: Socket) {
  //   const userId = Array.from(this.onlineUsers.entries()).find(
  //     ([, clientSocket]) => clientSocket.id === socket.id, // ✅ compare .id of Socket
  //   )?.[0];

  //   if (userId) {
  //     this.onlineUsers.delete(userId);
  //     console.log(`User ${userId} disconnected`);
  //   }
  // }
  //joining room
  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log('ddddd ,', data);
    client.join(data);
  }

  @SubscribeMessage('send_message')
  handleMessage(
    @MessageBody()
    data: MessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    // let bufferLenght = 0;
    // data.files?.forEach((f) => {
    //   bufferLenght += JSON.stringify(f.fileData).length;
    // });

    console.log('receive_message ,', data.roomId,data);

    client.to(data.roomId).emit('receive_message', {
      data,
    });
  }

  @SubscribeMessage('end-call')
  handleEndCall(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log('handle end call', data);
    client.to(data.roomId).emit('end-call', {
      sender: data.sender,
      receiver: data.receiver,
      roomId:data.roomId
    });
  }

  @SubscribeMessage('start-call')
  handleCall(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log('handle call', data);
    client.to(this.roomId).emit('start-call', {
      sender: data.sender,
      receiver: data.receiver,
    });
  }
  @SubscribeMessage('call-accepted')
  callAccepted(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log('aCCEPTED CALL', data);
    client.to(this.roomId).emit('call-accepted', {
      sender: data.sender,
      receiver: data.receiver,
    });
  }

  //call offer
  @SubscribeMessage('call-offer')
  handleCallOffer(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.to(data.roomId).emit('call-offer', {
      sender: data.sender,
      receiver: data.receiver,
      offer: data.offer,
      roomId: data.roomId,
    });
  }

  //call answer
  @SubscribeMessage('call-answer')
  handleCallAnswer(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.to(data.roomId).emit('call-answer', {
      sender: data.sender,
      receiver: data.receiver,
      answer: data.answer,
      roomId: data.roomId,
    });
  }

  //ice candidate
  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log('ice-candidate', data);
    client.to(data.roomId).emit('ice-candidate', {
      sender: data.sender,
      receiver: data.receiver,
      roomId:data.roomId,
      candidate: data.candidate,
    });
  }

  @SubscribeMessage('hangup-call')
  handleHangup(
    @MessageBody() data,
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.roomId).emit('hangup-call', {
      sender: data.sender,
      receiver: data.receiver,
      roomId:data.roomId
    });
  }
}
