import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useStore } from 'zustand';

import PlayersList from '../../components/PlayersList';
import GameStore from '../../stores/GameStore';
import extractSingle from '../../utils/extractSingle';

const Lobby = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const store = useStore(GameStore);
  const [playerName, setPlayerName] = useState('Anonymous Player');
  const hasInitializedRef = useRef(false);
  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }

    store.actions.joinGame(props.gameId);
    store.actions.updatePlayerName(playerName);
    hasInitializedRef.current = true;
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-6xl font-bold text-sky-500 mb-8">Lobby</p>
      <p className="text-2xl mb-4">Invite friends using the following URL</p>
      <p className="text-4xl mb-8">http://localhost:3000{router.asPath}</p>

      <div className="mb-8">
        <div className="max-w-lg mx-auto">
          <PlayersList
            players={[...Object.values(store.players)]}
            currentPlayerName={playerName}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="name"
          className="ml-px block pl-4 text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xl"
            placeholder="Anonymous Player"
            required
            onChange={(event) => {
              setPlayerName(event.target.value);
            }}
            onBlur={(event) => {
              store.actions.updatePlayerName(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Lobby;

export const getServerSideProps: GetServerSideProps<{
  gameId: string;
}> = async (context) => {
  return {
    props: {
      gameId: extractSingle(context.params?.id) ?? '',
    },
  };
};
