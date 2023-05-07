import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SequencerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private websocketServer: Server;

  afterInit(server: any): any {}

  handleConnection(client: any, ...args: any[]): any {}

  handleDisconnect(client: any): any {}
}
