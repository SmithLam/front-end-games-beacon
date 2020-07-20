import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGameDetail } from "../redux/actions/gameAction";
import Rating from "react-rating";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

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
      let cartData = { price: currentGame.price };
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
        <h1>This is Detail Page for {currentGame.name}</h1>
        <img
          alt="screenshot"
          id="game-screenshot"
          src={currentGame.background_image}
        ></img>
        <img
          alt="screenshot"
          id="game-screenshot"
          src={currentGame.background_image_additional}
        ></img>
        <div>Description: {currentGame.description_raw}</div>
        <Button id="btn" onClick={(e) => addtoCart(e, currentGame.id)}>
          Add to Cart
        </Button>

        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Rating</Form.Label>
            <Rating
              stop={5}
              emptySymbol={<GoThumbsdown size={20}></GoThumbsdown>}
              fullSymbol={<GoThumbsup size={20}></GoThumbsup>}
              onChange={(rate) => handleClick(rate)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Review</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your review"
            />
          </Form.Group>
          <Button
            id="btn"
            onClick={(e) =>
              submitReview(e, starValue, currentGame.id, description)
            }
          >
            Submit your review
          </Button>
        </Form>
      </>
    );
}

export default Detail;
