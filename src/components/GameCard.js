import React from "react";
import { Badge, Button, Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaKissWinkHeart } from "react-icons/fa";
import { fiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";

export default function GameCard(props) {
  const history = useHistory();

  const goDetail = (e, gameId) => {
    e.preventDefault();
    history.push(`/games/${gameId}`);
  };

  return (
    <div>
      <Card
        onClick={(e) => goDetail(e, props.id)}
        className="shadow-sm bg-white rounded"
        id="game-card"
      >
        <Card.Img
          id="card-image"
          variant="top"
          alt="card-image"
          src={props.image}
        />
        <Card.Body>
          <div className="d-flex mb-4 w-100 justify-content-between">
            <Card.Title id="card-name-tile" className="font-weight-bolder mr-2">
              {props.name}
            </Card.Title>
            <Badge pill className="mb-auto" variant="danger">
              <FaKissWinkHeart size={20}></FaKissWinkHeart>
            </Badge>
          </div>
          <div className="d-flex mt-1 mb-2 w-100 justify-content-between">
            <Card.Title id="price-number" className="mr-2">
              {props.price ? `At $${props.price}` : "Currently no sale"}
            </Card.Title>
            {props.price ? (
              <Button variant="success" className="px-2 py-1">
                <MdAddShoppingCart size={20}></MdAddShoppingCart>
                Add to Cart
              </Button>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
