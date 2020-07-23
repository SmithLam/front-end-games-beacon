import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaKissWinkHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import {
  wishlistGame,
  unWishlistGame,
  addToCart,
  removeFromCart,
} from "../redux/actions/gameAction";
import genericCover from "../images/imageNotAvailable.jpg";

export default function GameCard(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  let { currentWishlistId, currentCartIdList } = useSelector((s) => s.user);

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
          src={props.image || genericCover}
          onClick={(e) => goDetail(e, props.id)}
        />
        <Card.Body>
          <div className="d-flex mb-4 w-100 justify-content-between">
            <Card.Title id="card-name-tile" className="font-weight-bolder">
              {props.name}
            </Card.Title>
            {currentWishlistId && currentWishlistId.includes(props.id) ? (
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
                variant="light"
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
              currentCartIdList && currentCartIdList.includes(props.id) ? (
                <Button
                  variant="danger"
                  className="px-2 py-1"
                  onClick={(e) => dispatch(removeFromCart(e, props.id))}
                >
                  <MdRemoveShoppingCart size={20}></MdRemoveShoppingCart>
                  Remove From Cart
                </Button>
              ) : (
                <Button
                  variant="success"
                  className="px-2 py-1"
                  onClick={(e) =>
                    dispatch(
                      addToCart(
                        e,
                        props.id,
                        props.price,
                        props.name,
                        props.image
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
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
