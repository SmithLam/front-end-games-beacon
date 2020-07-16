import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getGames } from "../redux/actions/gameAction";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function MainPage() {
  let dispatch = useDispatch();
  let { currentGameList } = useSelector((state) => state.game);
  let { currentUser } = useSelector((s) => s.user);
  let [liked, setLiked] = useState(false);

  const wishlistGame = async (rawgId, cheapId, rawgName, rawgCover) => {
    try {
      console.log(rawgId, cheapId, rawgName, rawgCover);
      const findGame = await fetch(`http://localhost:5000/game/${rawgId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
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
            authorization: `Bearer ${localStorage.getItem("token")}`,
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
    } catch (err) {
      console.log(err.message);
    }
  };

  const unWishlistGame = async (rawgId) => {
    try {
      console.log(rawgId);
      const deleteWishlist = await fetch(
        `http://localhost:5000/wishlist/${rawgId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
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

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGames());
  }, []);

  //loading
  if (!currentGameList) {
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
          {currentGameList.map((game) => (
            <Card key={game.id} className="mb-3" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={game.background_image} />
              <Card.Body>
                <Card.Title>
                  {game.name}{" "}
                  {currentUser.wishlistRawgId.includes(game.id)
                    ? "Wishlisted"
                    : "Not Wishlisted"}
                  <AiOutlineHeart
                    id="heart-icon"
                    onClick={() =>
                      wishlistGame(
                        game.id,
                        game.cheapId,
                        game.name,
                        game.background_image
                      )
                    }
                  ></AiOutlineHeart>
                  <AiFillHeart
                    id="heart-icon"
                    onClick={() => unWishlistGame(game.id)}
                  ></AiFillHeart>
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
                <ListGroupItem>Release date: {game.released}</ListGroupItem>
                <ListGroupItem>
                  Best price:{" "}
                  {game.price ? `$${game.price}` : `Not Available Now`}
                </ListGroupItem>
              </ListGroup>
              <Button variant="danger">More detail</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
