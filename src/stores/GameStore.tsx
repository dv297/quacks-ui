import Ably from "ably";
import create from "zustand";

interface GameStoreInterface {
  gameId: string | null;
  actions: {
    joinGame: (id: string) => void;
  };
}

const GameStore = create<GameStoreInterface>()((setState) => {
  const client = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_KEY);

  return {
    gameId: null,
    actions: {
      joinGame(id) {
        setState({ gameId: id });
        const gameChannel = client.channels.get(id);

        gameChannel.subscribe((message) => {
          console.log(message);
        });

        gameChannel.publish("this is a new message", {});
      },
    },
  };
});

export default GameStore;
