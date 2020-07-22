import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";
import { LinkContainer, Container, Row, Col } from "react-router-bootstrap";
import {
  getGames,
  wishlistGame,
  unWishlistGame,
} from "../redux/actions/gameAction";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import GameCard from "./GameCard.js";

export default function Explore() {
  let dispatch = useDispatch();
  let history = useHistory();
  let { loaded } = useSelector((state) => state.app);
  let { currentUser, currentWishlist, CurrentCart } = useSelector(
    (state) => state.user
  );
  let { currentGameList, currentGameCount, currentPage } = useSelector(
    (state) => state.game
  );

  const handlePageChange = async (pageNumber) => {
    dispatch({ type: "LOADING" });
    console.log(process.env.REACT_APP_RAWG_URL);
    let url = `${process.env.REACT_APP_RAWG_URL}&dates=2020-06-01,2020-07-30&page=${pageNumber}`;
    console.log(url);
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
    dispatch({
      type: "LOAD-GAMES",
      payload: {
        gameList: gameList,
        gameCount: result.count,
        page: pageNumber,
      },
    });
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

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGames());
  }, []);

  //loading
  if (!loaded) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div>
      <Pagination
        className="pagination"
        hideDisabled
        prevPageText="Prev"
        nextPageText="Next"
        firstPageText="First"
        lastPageText="Last"
        activePage={currentPage}
        itemsCountPerPage={16}
        totalItemsCount={currentGameCount/16}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      ></Pagination>
      <div className="container-fluid">
        <div className="row d-flex flex-wrap justify-content-around">
          {!currentGameList
            ? ""
            : currentGameList.map((game, index) => (
                <div className="col-xs-12 col-md-3 my-2">
                  <GameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    price={game.price}
                    image={game.background_image}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

//  {
//    currentGameList.map((game, index) => (
//      <Card
//        key={game.id}
//        id={index}
//        className="mb-3"
//        style={{ width: "18rem" }}
//      >
//        <Card.Img variant="top" src={game.background_image} />
//        <Card.Body>
//          <Card.Title>
//            {game.name}{" "}
//            {currentUser ? (
//              currentUser.wishlistRawgId &&
//              currentUser.wishlistRawgId.includes(game.id) ? (
//                <AiFillHeart id="heart-icon"></AiFillHeart>
//              ) : (
//                <AiOutlineHeart id="heart-icon"></AiOutlineHeart>
//              )
//            ) : (
//              ""
//            )}
//          </Card.Title>
//          <Card.Text>
//            Available on
//            {game.platforms.map((item) => {
//              return (
//                <Badge key={item.platform.name} pill variant="danger">
//                  {item.platform.name}
//                </Badge>
//              );
//            })}
//          </Card.Text>
//        </Card.Body>
//        <ListGroup className="list-group-flush">
//          <ListGroupItem>
//            {" "}
//            <Button
//              variant="primary"
//              onClick={(e) =>
//                dispatch(
//                  wishlistGame(
//                    game.id,
//                    game.cheapId,
//                    game.name,
//                    game.background_image,
//                    index
//                  )
//                )
//              }
//            >
//              Add to Wishlist
//            </Button>
//            <Button
//              variant="danger"
//              onClick={(e) => dispatch(unWishlistGame(game.id, index))}
//            >
//              Remove from Wishlist
//            </Button>
//          </ListGroupItem>
//          <ListGroupItem>Release date: {game.released}</ListGroupItem>
//          <ListGroupItem>
//            Best price: {game.price ? `$${game.price}` : `Not Available Now`}
//          </ListGroupItem>
//        </ListGroup>
//        <Button onClick={(e) => goDetail(e, game.id)} variant="danger">
//          More detail
//        </Button>
//      </Card>
//    ));
//  }
