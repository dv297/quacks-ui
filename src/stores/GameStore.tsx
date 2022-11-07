import Ably from 'ably';
import create from 'zustand';

import GameChannelMessengerServiceProvider from '../services/GameChannelMessengerService';

const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substr(2, 16);
};

export interface Player {
  id: string;
  name: string;
}

interface GameStoreInterface {
  gameId: string | null;
  userId: string;
  players: Record<string, Player>;
  actions: {
    joinGame: (id: string) => void;
    updatePlayerName: (name: string) => void;
  };
}

const client = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_KEY);

const GameStore = create<GameStoreInterface>()((setState, getState) => {
  return {
    gameId: null,
    userId: generateUserId(),
    players: {},
    actions: {
      joinGame(gameId) {
        setState({ gameId });
        const gameChannel = client.channels.get(gameId);

        GameChannelMessengerServiceProvider.initialize(gameChannel);

        const service = GameChannelMessengerServiceProvider.instance();
        service.onPlayerListBroadcast((message) => {
          setState({ players: message.data });
        });

        service.onError((message) => {
          console.error(message);
        });

        if (!service) {
          return;
        }

        const { userId } = getState();
        service.joinGame(userId);
      },
      updatePlayerName(name: string) {
        const service = GameChannelMessengerServiceProvider.instance();

        if (!service) {
          return;
        }

        const { userId } = getState();
        service.updatePlayerName(userId, name);
      },
    },
  };
});

export default GameStore;
