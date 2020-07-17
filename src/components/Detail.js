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

  let [starValue, setStarValue] = useState(0);

  const handleClick = (rate) => {
    setStarValue(rate);
    console.log("this is the star chosen", starValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGameDetail(gameId));
  }, []);

  if (!loaded && !currentGame) {
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
          alt="screenshot-1"
          id="game-screenshot"
          src={currentGame.background_image}
        ></img>
        <img
          alt="screenshot-2"
          id="game-screenshot"
          src={currentGame.background_image_additional}
        ></img>
        <div>Description: {currentGame.description_raw}</div>

        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Rating</Form.Label>
            <Rating
              emptySymbol={<GoThumbsdown></GoThumbsdown>}
              fullSymbol={<GoThumbsup></GoThumbsup>}
              onChange={(rate) => handleClick(rate)}
              initialRating="0"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Review</Form.Label>
            <Form.Control type="text" placeholder="Enter your review" />
          </Form.Group>
          <Button type="submit">Submit your review</Button>
        </Form>
      </>
    );
}

export default Detail;
