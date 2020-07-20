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

export const getGameDetail = (gameId) => async (dispatch) => {
  console.log(gameId);
  if (!gameId) {
    return alert("there is no gameId");
  }
  dispatch({ type: "LOADING" });
  let rawgURL = `https://api.rawg.io/api/games/${gameId}`;
  let gameData = await fetch(rawgURL);
  let gameResult = await gameData.json();
  let game = gameResult;
  console.log(game.name);
  let price = await getPrice(game.name.replace(/ *\([^)]*\) */g, ""));
  console.log(price);
  game["price"] = price.price === null ? null : price.price * 1;
  game["cheapId"] = price.gameId === null ? null : price.gameId * 1;
  console.log(game);
  dispatch({ type: "LOAD-DETAIL-GAMES", payload: game });
  dispatch({ type: "LOADED" });
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

export const wishlistGame = (rawgId, cheapId, rawgName, rawgCover) => async (
  dispatch
) => {
  try {
    console.log(rawgId, cheapId, rawgName, rawgCover);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to register/log in to add wishlist!");
    }
    const findGame = await fetch(`http://localhost:5000/game/${rawgId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    let game = await findGame.json();
    if (!game.data) {
      let gameData = {
        rawgId: rawgId,
        cheapId: cheapId,
        rawgName: rawgName,
        rawgCover: rawgCover,
      };
      console.log(gameData);
      const createGame = await fetch(`http://localhost:5000/game/create`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      game = await createGame.json();
    }
    console.log("this is found game", game.data);
    console.log("this is found game id", game.data._id);
    let gameLocalId = game.data._id;
    console.log(gameLocalId);
    let wishlistData = { rawgId: rawgId };
    const createWishlist = await fetch(
      `http://localhost:5000/wishlist/${gameLocalId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistData),
      }
    );
    const wishList = await createWishlist.json();
    if (!wishList.data) {
      return console.log("this wishlist is already created");
    }
    console.log("this is new wishlist", wishList.data);
    // dispatch({ type: "SET_WISH_LIST", payload: wishList.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const unWishlistGame = (rawgId) => async (dispatch) => {
  try {
    console.log(rawgId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to register/log in to add wishlist!");
    }
    const deleteWishlist = await fetch(
      `http://localhost:5000/wishlist/${rawgId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const wishlistDeleted = await deleteWishlist.json();
    if (!wishlistDeleted.data) {
      return console.log("There is a problem in deleting wishlist");
    }
    console.log(wishlistDeleted);
  } catch (err) {
    console.log(err.message);
  }
};
