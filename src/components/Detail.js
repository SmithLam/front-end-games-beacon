import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Badge,
  Row,
} from "react-bootstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGameDetail } from "../redux/actions/gameAction";
import Rating from "react-rating";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { FaKissWinkHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import Youtube from "react-youtube";
import { wishlistGame, unWishlistGame } from "../redux/actions/gameAction";

function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  let { currentGame } = useSelector((s) => s.game);
  let { loaded } = useSelector((s) => s.app);
  let { currentUser, currentWishlistId } = useSelector((s) => s.user);

  const [starValue, setStarValue] = useState(0);
  const [description, setDescription] = useState("");

  const handleClick = (rate) => {
    setStarValue(rate);
  };

  const submitReview = async (e, rating, rawgId, description) => {
    try {
      e.preventDefault();
      console.log(rating, rawgId, description);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to register/log in to add wishlist!");
      }
      const findGame = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/game/${rawgId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let game = await findGame.json();
      if (!game.data) {
        let gameData = {
          rawgId: rawgId,
          cheapId: currentGame.cheapId,
          rawgName: currentGame.name,
          rawgCover: currentGame.background_image,
        };
        console.log(gameData);
        const createGame = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/game/create`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(gameData),
          }
        );
        game = await createGame.json();
      }
      console.log("this is found game", game.data);
      console.log("this is found game id", game.data._id);
      let gameLocalId = game.data._id;
      console.log(gameLocalId);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addtoCart = async (e, rawgId) => {
    try {
      e.preventDefault();
      console.log(rawgId);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to register/log in to add wishlist!");
      }
      const findGame = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/game/${rawgId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let game = await findGame.json();
      if (!game.data) {
        let gameData = {
          rawgId: rawgId,
          cheapId: currentGame.cheapId,
          rawgName: currentGame.name,
          rawgCover: currentGame.background_image,
        };
        console.log(gameData);
        const createGame = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/game/create`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(gameData),
          }
        );
        game = await createGame.json();
      }
      console.log("this is found game", game.data);
      console.log("this is found game id", game.data._id);
      let gameLocalId = game.data._id;
      console.log(gameLocalId);
      let cartData = {
        price: currentGame.price,
        name: currentGame.name,
        cover: currentGame.background_image,
      };
      const addCart = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart/${gameLocalId}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        }
      );
      let cart = await addCart.json();
      console.log(cart);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGameDetail(gameId));
  }, []);

  if (!loaded || !currentGame) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else
    return (
      <>
        <img id="detail-image-top" src={currentGame.background_image}></img>
        <Container fluid>
          <Row className="mt-2 mb-2">
            <Col xs={12} md={8}>
              <Card className="h-100 shadow bg-dark text-white">
                <Card.Body>
                  <Card.Title>
                    <h1>{currentGame.name}</h1>
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush bg-light text-dark">
                  <ListGroupItem>
                    {" "}
                    <Link
                      target="_blank"
                      to={{
                        pathname: `https://www.metacritic.com/game/pc/${currentGame.slug}`,
                      }}
                    >
                      Metacritic Score
                    </Link>
                    : {currentGame.metacritic || "No rating available"}
                  </ListGroupItem>
                  <ListGroupItem>
                    Platforms:{" "}
                    {currentGame.platforms
                      ? currentGame.platforms.map((item) => {
                          return (
                            <Badge
                              key={item.platform.id}
                              pill
                              className="mr-1 mb-1"
                              variant="danger"
                            >
                              {item.platform.name}
                            </Badge>
                          );
                        })
                      : ""}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card border="light" className="h-100">
                <Card.Body>
                  <Card.Text as="h3" className="mt-2 mb-1 text-center">
                    {currentGame.price
                      ? `Best Price: $${currentGame.price}`
                      : "Currently not on Sale"}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {currentGame.price ? (
                    <Button
                      onClick={(e) => addtoCart(e, currentGame.id)}
                      variant="success"
                    >
                      <MdAddShoppingCart size={20}></MdAddShoppingCart>
                      Add to Cart
                    </Button>
                  ) : (
                    ""
                  )}
                  {currentWishlistId.includes(currentGame.id) ? (
                    <Button
                      className="mb-auto py-1 wishlist-icon"
                      variant="danger"
                      onClick={(e) =>
                        dispatch(unWishlistGame(e, currentGame.id))
                      }
                    >
                      <FaKissWinkHeart size={20}> </FaKissWinkHeart>
                      Wishlisted
                    </Button>
                  ) : (
                    <Button
                      className="mb-auto py-1 wishlist-icon"
                      onClick={(e) =>
                        dispatch(
                          wishlistGame(
                            e,
                            currentGame.id,
                            currentGame.price,
                            currentGame.name,
                            currentGame.background_image
                          )
                        )
                      }
                      variant="secondary"
                    >
                      <FiHeart size={20}> </FiHeart>
                      Wishlist it!
                    </Button>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col xs={12} md={8} className="mt-2 mb-2 text-justify">
              <Card className="h-100">
                <Card.Header as="h5"> Game Description</Card.Header>
                <Card.Body>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: `${currentGame.description}`,
                    }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} className="mt-2 mb-2">
              <Card className="shadow">
                <Card.Header>
                  {" "}
                  <h5>Game Information</h5>
                </Card.Header>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <Youtube
                      videoId={currentGame.clip ? currentGame.clip.video : ""}
                      className="Youtube-player"
                    ></Youtube>
                  </ListGroupItem>
                  <ListGroupItem>
                    Release Date: {currentGame.released}
                  </ListGroupItem>
                  <ListGroupItem>
                    Developer:{" "}
                    {currentGame.developers
                      ? currentGame.developers.map((item) => {
                          return (
                            <Badge
                              key={item.id}
                              className="mr-1 mb-1"
                              variant="info"
                            >
                              {item.name}
                            </Badge>
                          );
                        })
                      : ""}
                  </ListGroupItem>
                  <ListGroupItem>
                    Publisher(s):{" "}
                    {currentGame.publishers
                      ? currentGame.publishers.map((item) => {
                          return (
                            <Badge
                              key={item.id}
                              className="mr-1 mb-1"
                              variant="secondary"
                            >
                              {item.name}
                            </Badge>
                          );
                        })
                      : ""}
                  </ListGroupItem>
                  <ListGroupItem>
                    Genres:{" "}
                    {currentGame.genres
                      ? currentGame.genres.map((item) => {
                          return (
                            <Badge
                              key={item.id}
                              className="mr-1 mb-1"
                              variant="dark"
                            >
                              {item.name}
                            </Badge>
                          );
                        })
                      : ""}
                  </ListGroupItem>
                  <ListGroupItem>
                    Tags:{" "}
                    {currentGame.tags
                      ? currentGame.tags.map((item) => {
                          return (
                            <Badge
                              key={item.id}
                              className="mr-1 mb-1"
                              variant="success"
                            >
                              {item.name}
                            </Badge>
                          );
                        })
                      : ""}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default Detail;
