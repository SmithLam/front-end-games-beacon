import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Pagination from "react-js-pagination";
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
    console.log("This is page number on explore", pageNumber);
    dispatch(getGames(pageNumber));
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
        itemsCountPerPage={12}
        totalItemsCount={Math.ceil((currentGameCount * 1) / 12)}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      ></Pagination>
      <div className="container-fluid">
        <div className="row d-flex flex-wrap justify-content-around">
          {!currentGameList
            ? ""
            : currentGameList.map((game, index) => (
                <div key={game.id} className="col-xs-12 col-md-3 my-2">
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
        <Pagination
          className="pagination"
          hideDisabled
          prevPageText="Prev"
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
          activePage={currentPage}
          itemsCountPerPage={12}
          totalItemsCount={Math.ceil((currentGameCount * 1) / 12)}
          onChange={(pageNumber) => handlePageChange(pageNumber)}
          itemClass="page-item"
          linkClass="page-link"
        ></Pagination>
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
