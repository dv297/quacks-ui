import { Types } from 'ably';
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

class GameChannelMessengerService {
  channel: RealtimeChannelCallbacks;

  constructor(_channel: RealtimeChannelCallbacks) {
    this.channel = _channel;
  }

  joinGame(gameId: string, userId: string) {
    this.channel.publish('addPlayer', {
      user: { username: null, id: userId },
    });
  }
}

class GameChannelMessengerServiceProvider {
  static gcmService: GameChannelMessengerService;
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

    if (GameChannelMessengerServiceProvider.gcmService) {
      return GameChannelMessengerServiceProvider.gcmService;
    }

    GameChannelMessengerServiceProvider.gcmService =
      new GameChannelMessengerService(
        GameChannelMessengerServiceProvider.channel
      );
  }
}

export default GameChannelMessengerServiceProvider;
