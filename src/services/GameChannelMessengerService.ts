import { Types } from 'ably';
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

class GameChannelMessengerService {
  channel: RealtimeChannelCallbacks;

  constructor(_channel: RealtimeChannelCallbacks) {
    this.channel = _channel;
  }

  joinGame(userId: string) {
    console.log('addPlayer');
    this.channel.publish('addPlayer', {
      user: { name: '', id: userId },
    });
  }

  updatePlayerName(userId: string, playerName: string) {
    console.log('updatePlayerName');
    this.channel.publish('updatePlayerName', {
      user: { id: userId, name: playerName },
    });
  }

  onPlayerListBroadcast(callback: Types.messageCallback<any>) {
    this.channel.subscribe('broadcastPlayerList', callback);
  }

  onError(callback: Types.messageCallback<any>) {
    this.channel.subscribe('error', callback);
  }
}

class GameChannelMessengerServiceProvider {
  static service: GameChannelMessengerService;
  static channel: RealtimeChannelCallbacks;

  static initialize(_channel: RealtimeChannelCallbacks) {
    GameChannelMessengerServiceProvider.channel = _channel;
  }

  static instance() {
    if (!GameChannelMessengerServiceProvider.channel) {
      throw new Error(
        'Ably channel not initialized, please call GameChannelMessengerServiceProvider.initialize with a valid Ably Realtime Channel'
      );
    }

    if (GameChannelMessengerServiceProvider.service) {
      return GameChannelMessengerServiceProvider.service;
    }

    GameChannelMessengerServiceProvider.service =
      new GameChannelMessengerService(
        GameChannelMessengerServiceProvider.channel
      );

    return GameChannelMessengerServiceProvider.service;
  }
}

export default GameChannelMessengerServiceProvider;
