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
import { fiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import Youtube from "react-youtube";

function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  let { currentGame } = useSelector((s) => s.game);
  let { loaded } = useSelector((s) => s.app);
  let { currentUser } = useSelector((s) => s.user);

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
          cheapId: currentGame.cheapId,
          rawgName: currentGame.name,
          rawgCover: currentGame.background_image,
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
          cheapId: currentGame.cheapId,
          rawgName: currentGame.name,
          rawgCover: currentGame.background_image,
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
      let cartData = {
        price: currentGame.price,
        name: currentGame.name,
        cover: currentGame.background_image,
      };
      const addCart = await fetch(`http://localhost:5000/cart/${gameLocalId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });
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
                    : {currentGame.metacritic}
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
                  <Card.Text className="mt-2 mb-1 text-center">
                    <h3>
                      {currentGame.price
                        ? `Best Price: $${currentGame.price}`
                        : "Free"}
                    </h3>
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
                  <Button variant="danger">
                    <FaKissWinkHeart size={20}></FaKissWinkHeart>
                    Wishlisted
                  </Button>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col xs={12} md={8} className="mt-2 mb-2 text-justify">
              <Card className="h-100">
                <Card.Header as="h5">
                  {" "}
                  <h5>Game Description</h5>
                </Card.Header>
                <Card.Body>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: `${currentGame.description}`,
                    }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col xs={12} md={5} className="mt-2 mb-2 text-justify">
              <Card className="h-100">
                <Card.Header as="h5">
                  {" "}
                  <h5>PC Requirements</h5>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <span className="text-danger">Mininum</span>: Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Quam
                    nulla porttitor massa id neque aliquam vestibulum morbi.
                    Aliquam eleifend mi in nulla posuere. Auctor neque vitae
                    tempus quam. In ante metus dictum at tempor commodo
                    ullamcorper a. Commodo odio aenean sed adipiscing diam donec
                    adipiscing tristique. Leo a diam sollicitudin tempor.
                    Volutpat commodo sed egestas egestas fringilla phasellus
                    faucibus scelerisque eleifend. Sit amet purus gravida quis
                    blandit. Leo integer malesuada nunc vel risus commodo
                    viverra. Vulputate odio ut enim blandit. Malesuada
                    pellentesque elit eget gravida cum. Sit amet justo donec
                    enim diam. Ut consequat semper viverra nam libero.
                  </Card.Text>
                  <Card.Text>
                    <span className="text-success">Recommended</span>: Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Quam nulla porttitor massa id neque aliquam vestibulum
                    morbi. Aliquam eleifend mi in nulla posuere. Auctor neque
                    vitae tempus quam. In ante metus dictum at tempor commodo
                    ullamcorper a. Commodo odio aenean sed adipiscing diam donec
                    adipiscing tristique. Leo a diam sollicitudin tempor.
                    Volutpat commodo sed egestas egestas fringilla phasellus
                    faucibus scelerisque eleifend. Sit amet purus gravida quis
                    blandit. Leo integer malesuada nunc vel risus commodo
                    viverra. Vulputate odio ut enim blandit. Malesuada
                    pellentesque elit eget gravida cum. Sit amet justo donec
                    enim diam. Ut consequat semper viverra nam libero.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col> */}
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

// <img
//     id="detail-image-top"
//     src="https://www.pcgamesn.com/wp-content/uploads/2018/10/the-witcher-3-final-boss-header.png"
//   ></img>
//   <Container fluid>
//     <Row className="mt-2 mb-2">
//       <Col xs={12} md={8}>
//         <Card className="h-100 shadow bg-dark text-white">
//           <Card.Body>
//             <Card.Title>
//               <h1>Witcher 3</h1>
//             </Card.Title>
//           </Card.Body>
//           <ListGroup className="list-group-flush bg-light text-dark">
//             <ListGroupItem> Metacritic Rating: 9</ListGroupItem>
//             <ListGroupItem>
//               {" "}
//               Platforms:{" "}
//               <Badge pill variant="danger" className="mr-1">
//                 PC
//               </Badge>
//               <Badge pill variant="danger" className="mr-1">
//                 PS5
//               </Badge>
//             </ListGroupItem>
//           </ListGroup>
//         </Card>
//       </Col>
//       <Col xs={12} md={4}>
//         <Card border="light" className="h-100">
//           <Card.Body>
//             <Card.Text className="mt-2 mb-1 text-center">
//               <h3>Best Price: $15</h3>
//             </Card.Text>
//           </Card.Body>
//           <ListGroup className="list-group-flush">
//             <Button variant="success" href="#">
//               <MdAddShoppingCart size={20}></MdAddShoppingCart>
//               Add to Cart
//             </Button>
//             <Button variant="danger" href="#">
//               <FaKissWinkHeart size={20}></FaKissWinkHeart>
//               Wishlisted
//             </Button>
//           </ListGroup>
//         </Card>
//       </Col>
//     </Row>
//   </Container>
//   <Container fluid>
//     <Row>
//       <Col xs={12} md={4} className="mt-2 mb-2 text-justify">
//         <Card className="h-100">
//           <Card.Header as="h5">
//             {" "}
//             <h5>Game Description</h5>
//           </Card.Header>
//           <Card.Body>
//             <Card.Text>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//               do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               Quam nulla porttitor massa id neque aliquam vestibulum morbi.
//               Aliquam eleifend mi in nulla posuere. Auctor neque vitae
//               tempus quam. In ante metus dictum at tempor commodo
//               ullamcorper a. Commodo odio aenean sed adipiscing diam donec
//               adipiscing tristique. Leo a diam sollicitudin tempor. Volutpat
//               commodo sed egestas egestas fringilla phasellus faucibus
//               scelerisque eleifend. Sit amet purus gravida quis blandit. Leo
//               integer malesuada nunc vel risus commodo viverra. Vulputate
//               odio ut enim blandit. Malesuada pellentesque elit eget gravida
//               cum. Sit amet justo donec enim diam. Ut consequat semper
//               viverra nam libero.
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col xs={12} md={5} className="mt-2 mb-2 text-justify">
//         <Card className="h-100">
//           <Card.Header as="h5">
//             {" "}
//             <h5>PC Requirements</h5>
//           </Card.Header>
//           <Card.Body>
//             <Card.Text>
//               <span className="text-danger">Mininum</span>: Lorem ipsum
//               dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//               tempor incididunt ut labore et dolore magna aliqua. Quam nulla
//               porttitor massa id neque aliquam vestibulum morbi. Aliquam
//               eleifend mi in nulla posuere. Auctor neque vitae tempus quam.
//               In ante metus dictum at tempor commodo ullamcorper a. Commodo
//               odio aenean sed adipiscing diam donec adipiscing tristique.
//               Leo a diam sollicitudin tempor. Volutpat commodo sed egestas
//               egestas fringilla phasellus faucibus scelerisque eleifend. Sit
//               amet purus gravida quis blandit. Leo integer malesuada nunc
//               vel risus commodo viverra. Vulputate odio ut enim blandit.
//               Malesuada pellentesque elit eget gravida cum. Sit amet justo
//               donec enim diam. Ut consequat semper viverra nam libero.
//             </Card.Text>
//             <Card.Text>
//               <span className="text-success">Recommended</span>: Lorem ipsum
//               dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//               tempor incididunt ut labore et dolore magna aliqua. Quam nulla
//               porttitor massa id neque aliquam vestibulum morbi. Aliquam
//               eleifend mi in nulla posuere. Auctor neque vitae tempus quam.
//               In ante metus dictum at tempor commodo ullamcorper a. Commodo
//               odio aenean sed adipiscing diam donec adipiscing tristique.
//               Leo a diam sollicitudin tempor. Volutpat commodo sed egestas
//               egestas fringilla phasellus faucibus scelerisque eleifend. Sit
//               amet purus gravida quis blandit. Leo integer malesuada nunc
//               vel risus commodo viverra. Vulputate odio ut enim blandit.
//               Malesuada pellentesque elit eget gravida cum. Sit amet justo
//               donec enim diam. Ut consequat semper viverra nam libero.
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col xs={12} md={3} className="mt-2 mb-2">
//         <Card className="shadow">
//           <Card.Header>
//             {" "}
//             <h5>Game Information</h5>
//           </Card.Header>
//           <ListGroup className="list-group-flush">
//             <ListGroupItem>
//               Developer:{" "}
//               <Badge pill variant="info">
//                 CD Projekt Red
//               </Badge>
//             </ListGroupItem>
//             <ListGroupItem>
//               Publisher(s):{" "}
//               <Badge pill variant="secondary" className="mr-1 mb-1">
//                 CD Projekt Red
//               </Badge>
//               <Badge pill variant="secondary" className="mr-1 mb-1">
//                 Namco Bandai
//               </Badge>
//             </ListGroupItem>
//             <ListGroupItem>
//               Genres:{" "}
//               <Badge variant="dark" className="mr-1 mb-1">
//                 RPG
//               </Badge>
//               <Badge variant="dark" className="mr-1 mb-1">
//                 Action
//               </Badge>
//             </ListGroupItem>
//             <ListGroupItem>
//               Tags:{" "}
//               <Badge variant="success" className="mr-1 mb-1">
//                 Single-player
//               </Badge>
//               <Badge variant="success" className="mr-1 mb-1">
//                 Atmospheric
//               </Badge>
//             </ListGroupItem>
//           </ListGroup>
//         </Card>
//       </Col>
//     </Row>
//   </Container>

//  <h1>This is Detail Page for {currentGame.name}</h1>
// <img
//   alt="screenshot"
//   id="game-screenshot"
//   src={currentGame.background_image}
// ></img>
// <img
//   alt="screenshot"
//   id="game-screenshot"
//   src={currentGame.background_image_additional}
// ></img>
// <div>Description: {currentGame.description_raw}</div>
// <Button id="btn" onClick={(e) => addtoCart(e, currentGame.id)}>
//   Add to Cart
// </Button>

// <Form>
//   <Form.Group controlId="formGroupEmail">
//     <Form.Label>Rating</Form.Label>
//     <Rating
//       stop={5}
//       emptySymbol={<GoThumbsdown size={20}></GoThumbsdown>}
//       fullSymbol={<GoThumbsup size={20}></GoThumbsup>}
//       onChange={(rate) => handleClick(rate)}
//     />
//   </Form.Group>
//   <Form.Group controlId="formGroupPassword">
//     <Form.Label>Review</Form.Label>
//     <Form.Control
//       type="text"
//       onChange={(e) => setDescription(e.target.value)}
//       placeholder="Enter your review"
//     />
//   </Form.Group>
//   <Button
//     id="btn"
//     onClick={(e) =>
//       submitReview(e, starValue, currentGame.id, description)
//     }
//   >
//     Submit your review
//   </Button>
// </Form>
