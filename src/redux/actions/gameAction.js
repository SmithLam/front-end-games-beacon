export const getGames = () => async (dispatch) => {
  try {
    let url = `https://api.rawg.io/api/games?page=1&page_size=5&platforms=4`;
    let data = await fetch(url);
    let result = await data.json();
    console.log(result.results);
    let gameList = result.results;
    let gamePrices = gameList.map(async (game) => {
      let price = await getPrice(game.name.replace(/ *\([^)]*\) */g, "")); //remove spaces between parantheses
      game["price"] = price.price === null ? null : price.price * 1;
      game["cheapId"] = price.gameId === null ? null : price.gameId * 1;
      return game;
    });
    gameList = await Promise.all(gamePrices);
    console.log(gameList);
    dispatch({ type: "LOAD-GAMES", payload: gameList });
  } catch (err) {
    console.log(err);
  }
};

const getPrice = async (name) => {
  let url = `https://www.cheapshark.com/api/1.0/games?title=${name}`;
  let datas = await fetch(url);
  let price = await datas.json();
  return {
    price: price[0] ? price[0].cheapest : null,
    gameId: price[0] ? price[0].gameID : null,
  };
};

