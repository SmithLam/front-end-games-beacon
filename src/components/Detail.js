import React, { useEffect } from "react";
import {
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
import { FaKissWinkHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import Youtube from "react-youtube";
import {
  wishlistGame,
  unWishlistGame,
  addToCart,
  removeFromCart,
} from "../redux/actions/gameAction";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 10% auto;
`;

function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  let { currentGame } = useSelector((s) => s.game);
  let { loaded } = useSelector((s) => s.app);
  let { currentWishlistId, currentCartIdList } = useSelector((s) => s.user);

  const searchGame = (e, searchTerm) => {
    e.preventDefault();
    dispatch({ type: "SEARCH-GAME", payload: searchTerm });
    history.push("/explore");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGameDetail(gameId));
  }, [dispatch, gameId]);

  if (!loaded || !currentGame) {
    return (
      <div className="d-flex flex-row justify-content-center">
        <PacmanLoader css={override} size={125} color={"black"} />;
      </div>
    );
  } else
    return (
      <>
        <img
          id="detail-image-top"
          alt="background"
          src={currentGame.background_image}
        ></img>
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
                    currentCartIdList &&
                    currentCartIdList.includes(currentGame.id) ? (
                      <Button
                        variant="danger"
                        onClick={(e) =>
                          dispatch(removeFromCart(e, currentGame.id))
                        }
                      >
                        <MdRemoveShoppingCart size={20}></MdRemoveShoppingCart>
                        Remove From Cart
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={(e) =>
                          dispatch(
                            addToCart(
                              e,
                              currentGame.id,
                              currentGame.price,
                              currentGame.name,
                              currentGame.background_image
                            )
                          )
                        }
                      >
                        <MdAddShoppingCart size={20}></MdAddShoppingCart>
                        Add to Cart
                      </Button>
                    )
                  ) : (
                    ""
                  )}
                  {currentWishlistId &&
                  currentWishlistId.includes(currentGame.id) ? (
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
                      variant="warning"
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
                              id="badge-click"
                              onClick={(e) =>
                                searchGame(e, `&developers=${item.id}`)
                              }
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
                              id="badge-click"
                              onClick={(e) =>
                                searchGame(e, `&publishers=${item.id}`)
                              }
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
                              id="badge-click"
                              onClick={(e) =>
                                searchGame(e, `&genres=${item.id}`)
                              }
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
                              id="badge-click"
                              onClick={(e) =>
                                searchGame(e, `&tags=${item.id}`)
                              }
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
