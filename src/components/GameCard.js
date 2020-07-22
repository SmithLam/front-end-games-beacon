import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaKissWinkHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { wishlistGame, unWishlistGame } from "../redux/actions/gameAction";

export default function GameCard(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  let { currentWishlistId } = useSelector((s) => s.user);

  const goDetail = (e, gameId) => {
    e.preventDefault();
    history.push(`/games/${gameId}`);
  };

  return (
    <div>
      <Card className="shadow-sm bg-white rounded" id="game-card">
        <Card.Img
          id="card-image"
          variant="top"
          alt="See More Detail"
          src={props.image}
          onClick={(e) => goDetail(e, props.id)}
        />
        <Card.Body>
          <div className="d-flex mb-4 w-100 justify-content-between">
            <Card.Title id="card-name-tile" className="font-weight-bolder mr-2">
              {props.name}
            </Card.Title>
            {currentWishlistId.includes(props.id) ? (
              <Badge
                pill
                className="mb-auto py-1 wishlist-icon"
                variant="danger"
                onClick={(e) => dispatch(unWishlistGame(e, props.id))}
              >
                <FaKissWinkHeart size={20}></FaKissWinkHeart>
              </Badge>
            ) : (
              <Badge
                pill
                className="mb-auto py-1 wishlist-icon"
                onClick={(e) =>
                  dispatch(
                    wishlistGame(
                      e,
                      props.id,
                      props.price,
                      props.name,
                      props.image
                    )
                  )
                }
                variant="secondary"
              >
                <FiHeart size={20}></FiHeart>
              </Badge>
            )}
          </div>
          <div className="d-flex mt-1 mb-2 w-100 justify-content-between">
            <Card.Title id="price-number" className="mr-2">
              {props.price ? `At $${props.price}` : "Currently not on Sale"}
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
