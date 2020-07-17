import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  getGames,
  wishlistGame,
  unWishlistGame,
} from "../redux/actions/gameAction";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function MainPage() {
  let dispatch = useDispatch();
  let history = useHistory();
  let { loaded } = useSelector((state) => state.app);
  let { currentGameList } = useSelector((state) => state.game);
  let { currentUser } = useSelector((state) => state.user);
  let [liked, setLiked] = useState(false);

  const goDetail = (e, gameId) => {
    e.preventDefault();
    history.push(`/games/${gameId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGames());
  }, []);


  //loading
  if (!loaded || !currentGameList) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>This is Main Page</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/07w-ITS91_M/maxresdefault.jpg"
        />
        <Card.Body>
          <Card.Title>
            Cyberpunk 2077
            {/* {liked === true ? (
              <AiFillHeart onClick={() => setLiked(false)}></AiFillHeart>
            ) : (
              <AiOutlineHeart onClick={() => setLiked(true)}></AiOutlineHeart>
            )} */}
            <AiOutlineHeart></AiOutlineHeart>
          </Card.Title>
          <Card.Text>Available on PC, PS4, Xbox One</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Release date: </ListGroupItem>
          <ListGroupItem>Best price: </ListGroupItem>
        </ListGroup>
        <Button variant="danger">More detail</Button>
      </Card>
      <div className="container-fluid">
        <div className="Row"></div>
        <div className="col-md-12 d-flex flex-wrap justify-content-around">
          {currentGameList.map((game, index) => (
            <Card key={game.id} id={index} className="mb-3" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={game.background_image} />
              <Card.Body>
                <Card.Title>
                  {game.name}{" "}
                  {currentUser ? (
                    currentUser.wishlistRawgId.includes(game.id) || liked===true? (
                      <AiFillHeart id="heart-icon"></AiFillHeart>
                    ) : (
                      <AiOutlineHeart id="heart-icon"></AiOutlineHeart>
                    )
                  ) : (
                    ""
                  )}
                </Card.Title>
                <Card.Text>
                  Available on
                  {game.platforms.map((item) => {
                    return (
                      <Badge key={item.platform.name} pill variant="danger">
                        {item.platform.name}
                      </Badge>
                    );
                  })}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  {" "}
                  <Button
                    variant="primary"
                    onClick={(e) =>
                      dispatch(
                        wishlistGame(
                          game.id,
                          game.cheapId,
                          game.name,
                          game.background_image,
                          index
                        )
                      )
                    }
                  >
                    Add to Wishlist
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => dispatch(unWishlistGame(game.id, index))}
                  >
                    Remove from Wishlist
                  </Button>
                </ListGroupItem>
                <ListGroupItem>Release date: {game.released}</ListGroupItem>
                <ListGroupItem>
                  Best price:{" "}
                  {game.price ? `$${game.price}` : `Not Available Now`}
                </ListGroupItem>
              </ListGroup>
              <Button onClick={(e) => goDetail(e, game.id)} variant="danger">
                More detail
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
