import { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useStore } from "zustand";

import GameStore from "../../stores/GameStore";
import extractSingle from "../../utils/extractSingle";

const Lobby = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const store = useStore(GameStore);
  useEffect(() => {
    store.actions.joinGame(props.gameId);
  }, []);

  return <h1>lobby</h1>;
};

export default Lobby;

export const getServerSideProps: GetServerSideProps<{
  gameId: string;
}> = async (context) => {
  return {
    props: {
      gameId: extractSingle(context.params?.id) ?? "",
    },
  };
};
