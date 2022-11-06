import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

import FullScreenLoader from "../components/FullScreenLoader";
import GameService from "../services/GameService";

export default function Home() {
  const [hasRequestedGameId, setHasRequestedGameId] = useState(false);
  const router = useRouter();

  const { isFetching } = useQuery(["gameId"], GameService.getGameId, {
    enabled: hasRequestedGameId,
    onSuccess(data) {
      router.push(`/${data.data.gameId}/lobby`);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <Head>
        <title>The Quacks of Quedlinburg</title>
        <meta
          name="description"
          content="Digital adaptation of The Quacks of Quedlinburg board game"
        />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <main>
        <FullScreenLoader loading={isFetching} />
        <div className="w-screen min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-5xl font-extrabold mb-8 text-center">
            The Quacks of Quedlinburg
          </h1>
          <button
            onClick={() => {
              setHasRequestedGameId(true);
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Game
          </button>
        </div>
      </main>
    </div>
  );
}
