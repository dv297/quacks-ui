import Ably from 'ably';
import create from 'zustand';

import GameChannelMessengerServiceProvider from '../services/GameChannelMessengerService';

const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substr(2, 16);
};

interface GameStoreInterface {
  gameId: string | null;
  userId: string | null;
  actions: {
    joinGame: (id: string) => void;
  };
}

const client = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_KEY);

const GameStore = create<GameStoreInterface>()((setState) => {
  return {
    gameId: null,
    userId: null,
    actions: {
      joinGame(gameId) {
        setState({ gameId });
        const gameChannel = client.channels.get(gameId);

        GameChannelMessengerServiceProvider.initialize(gameChannel);

        const userId = generateUserId();
        setState({ userId });

        GameChannelMessengerServiceProvider.instance()?.joinGame(
          gameId,
          userId
        );
      },
    },
  };
});

export default GameStore;
