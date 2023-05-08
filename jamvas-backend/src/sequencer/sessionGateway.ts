import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SequencerConfiguration } from './sequencer-configuration';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class SessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public static readonly EVENT_SEQUENCER_CONFIG_UPDATED = 'configUpdated';
  public static readonly EVENT_USER_JOINED_SESSION = 'userJoined';
  private readonly logger = new Logger(SessionGateway.name);

  @WebSocketServer() private websocketServer: Server;

  afterInit(server: Server): any {
    this.logger.log('Websocket initialized');
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log(`Websocket client connected: ${client.id}`);
  }

  handleDisconnect(client: any): any {
    this.logger.log(`Websocket client disconnected: ${client.id}`);
  }

  broadcastSequencerConfigurationUpdate(updatedConfiguration: SequencerConfiguration) {
    this.logger.log('Broadcasting sequencer configuration update');
    this.websocketServer.emit(SessionGateway.EVENT_SEQUENCER_CONFIG_UPDATED, updatedConfiguration);
  }

  broadcastUserJoinedSession(newUser: User) {
    this.logger.log('Broadcasting user joined session');
    this.websocketServer.emit(SessionGateway.EVENT_USER_JOINED_SESSION, newUser);
  }
}
