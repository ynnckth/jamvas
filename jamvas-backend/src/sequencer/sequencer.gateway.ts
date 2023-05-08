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
export class SequencerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public static readonly EVENT_SEQUENCER_CONFIG_UPDATED = 'configUpdated';
  private readonly logger = new Logger(SequencerGateway.name);

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
    this.websocketServer.emit(SequencerGateway.EVENT_SEQUENCER_CONFIG_UPDATED, updatedConfiguration);
  }
}
