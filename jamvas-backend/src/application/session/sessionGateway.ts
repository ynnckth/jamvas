import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SequencerConfiguration } from '../../domain/sequencer-configuration';
import { Logger } from '@nestjs/common';
import { SessionUser } from '../../domain/session-user';
import { SessionService } from './session.service';

@WebSocketGateway({ cors: true })
export class SessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public static readonly EVENT_CONNECT_CLIENT = 'connectClient';
  public static readonly EVENT_SEQUENCER_CONFIG_UPDATED = 'configUpdated';
  public static readonly EVENT_USERS_IN_SESSION_UPDATED = 'usersInSessionUpdated';

  private readonly logger = new Logger(SessionGateway.name);

  @WebSocketServer() private websocketServer: Server;

  constructor(private sessionService: SessionService) {}

  afterInit(server: Server): any {
    this.logger.log('Websocket initialized');
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log(`Websocket client connected: ${client.id}`);
  }

  async handleDisconnect(client: any): Promise<void> {
    this.logger.log(`Websocket client disconnected: ${client.id}`);
    const sessionUser = this.sessionService.getSessionUser(client.id);
    const updatedUsers = await this.sessionService.removeUserFromSession(sessionUser.userId);
    this.broadcastSessionUsersUpdated(updatedUsers);
  }

  @SubscribeMessage(SessionGateway.EVENT_CONNECT_CLIENT)
  handleConnectClientEvent(@MessageBody() sessionUser: SessionUser): void {
    this.logger.log(
      `Websocket client connected - userId: ${sessionUser.userId}, socketClientId: ${sessionUser.socketClientId}`,
    );
    this.sessionService.addUserToSession(sessionUser);
  }

  broadcastSequencerConfigurationUpdated(updatedConfiguration: SequencerConfiguration) {
    this.logger.log('Broadcasting sequencer configuration update');
    this.websocketServer.emit(SessionGateway.EVENT_SEQUENCER_CONFIG_UPDATED, updatedConfiguration);
  }

  broadcastSessionUsersUpdated(updatedUsers: User[]) {
    this.logger.log('Broadcasting session users updated');
    this.websocketServer.emit(SessionGateway.EVENT_USERS_IN_SESSION_UPDATED, updatedUsers);
  }
}
