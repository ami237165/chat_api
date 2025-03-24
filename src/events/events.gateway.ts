import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;
    //online users
    private onlineUsers = new Map<string, string>();

    handleConnection(socket:Socket){
        const userId = socket.handshake.query.userId as string;
        if(userId){
            this.onlineUsers.set(userId,socket.id)
            console.log(`User ${userId} online with ${socket.id}`);

        }
    }

    handleDisconnect(socket:Socket){
        const userId = Array.from(this.onlineUsers.entries()).find(
            ([,socketId]) => socketId === socket.id)?.[0]
        
        if(userId){
            this.onlineUsers.delete(userId);
            console.log(`User ${userId} offline`);

        }
    }

    @SubscribeMessage('message')
    handleMessage(
        @MessageBody() data: { sender: string, receiver: string, message: string },
    ) {
        this.server.to(data.receiver).emit('message', data);
    }
    @SubscribeMessage('join')
    handleJoin(@MessageBody() userId: string, @ConnectedSocket() socket: Socket) {
        socket.join(userId);
    }


}