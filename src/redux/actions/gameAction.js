export const getGames = (pageNumber, searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    if (!pageNumber) {
      pageNumber = 1;
    }
    if (!searchQuery) {
      searchQuery = "";
    }
    console.log(searchQuery);
    console.log("this is current Page Number", pageNumber);
    let url = `${process.env.REACT_APP_RAWG_URL}&page=${pageNumber}${searchQuery}`;
    console.log(url);
    let data = await fetch(url);
    let result = await data.json();
    console.log(result.results);
    let gameList = result.results;
    let gamePrices = gameList.map(async (game) => {
      let price = await getPrice(game.name.replace(/ *\([^)]*\) */g, "")); //remove spaces between parantheses
      game["price"] = price.price === null ? null : price.price * 1;
      return game;
    });
    gameList = await Promise.all(gamePrices);
    console.log(gameList);
    dispatch({
      type: "LOAD-GAMES",
      payload: {
        gameList: gameList,
        gameCount: result.count,
        page: pageNumber,
      },
    });
    dispatch({ type: "LOADED" });
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

export const wishlistGame = (e, rawgId, price, rawgName, rawgCover) => async (
  dispatch
) => {
  try {
    e.preventDefault();
    console.log(rawgId, price, rawgName, rawgCover);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to register/log in to add wishlist!");
    }
    let wishlistData = {
      rawgId: rawgId,
      price: price,
      name: rawgName,
      cover: rawgCover,
    };
    const createWishlist = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/${rawgId}`,
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
    dispatch(fetchWishlist());
  } catch (err) {
    console.log(err.message);
  }
};

export const unWishlistGame = (e, rawgId) => async (dispatch) => {
  try {
    e.preventDefault();
    console.log(rawgId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to register/log in to add wishlist!");
    }
    const deleteWishlist = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/${rawgId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(fetchWishlist());
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchWishlist = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const findWishlist = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await findWishlist.json();
    console.log("this is wishlist", result.data);
    const wishlistRawgId = result.data.map((e) => e.rawgId);
    console.log("this is wishlist id", wishlistRawgId);
    dispatch({
      type: "RELOAD-WISHLIST",
      payload: { wishlist: result.data, wishlistId: wishlistRawgId },
    });
  } catch (err) {
    console.log(err.message);
  }
};
