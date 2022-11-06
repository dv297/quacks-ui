import { useEffect, useRef } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useStore } from 'zustand';

import GameStore from '../../stores/GameStore';
import extractSingle from '../../utils/extractSingle';

const Lobby = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const store = useStore(GameStore);
  const hasInitializedRef = useRef(false);
  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }

    store.actions.joinGame(props.gameId);
    hasInitializedRef.current = true;
  }, []);

  return (
    <div>
      <p>Lobby</p>
      <p>{store.gameId}</p>
      <p>{store.userId}</p>
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
