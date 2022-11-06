// http://192.168.86.229:3000/

const GameService = {
  async getGameId(): Promise<{ data: { gameId: string } }> {
    const result = await fetch("http://192.168.86.229:3000/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!result.ok) {
      throw new Error("Issue occurred");
    }

    const response = await result.json();
    return response;

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       data: {
    //         gameId: "abc",
    //       },
    //     });
    //   }, 2000);
    // });
  },
};

export default GameService;
