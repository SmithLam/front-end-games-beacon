import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/cart_styles.css";
import "../styles/cart_responsive.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { fetchCart, removeFromCart } from "../redux/actions/gameAction";
import { fetchUser } from "../redux/actions/userAction";

const override = css`
  display: block;
  margin: 10% auto;
`;

function Cart() {
  const dispatch = useDispatch();
  let history = useHistory();
  let { currentCart, currentTotalCartPrice } = useSelector((s) => s.user);
  let { loaded } = useSelector((s) => s.app);

  // const goTo = (e, location) => {
  //   // e.preventDefault();
  //   history.push(location);
  // };

  const searchGame = (e, searchTerm) => {
    e.preventDefault();
    dispatch({ type: "SEARCH-GAME", payload: searchTerm });
    history.push("/explore");
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const checkOut = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    const result = await checkOut.json();
    console.log("this is the checkout", result.data);
    dispatch(fetchUser());
    alert(
      "Congratulations! Purchased completed. Please check your profile!"
    );
    history.push("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCart());
  }, [dispatch]);

  if (!loaded || !currentCart) {
    return (
      <div className="d-flex flex-row justify-content-center">
        <PacmanLoader css={override} size={125} color={"black"} />;
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 mt-2">
            <div className="cart_container">
              <div className="cart_title">Shopping Cart</div>
              <div className="cart_items">
                <ul className="cart_list">
                  {currentCart &&
                    currentCart.items &&
                    currentCart.items.map((game, index) => {
                      return (
                        <li key={index} className="cart_item clearfix">
                          <div className="cart_item_image">
                            <img src={game.cover} id="cart-image" alt="" />
                          </div>
                          <div className="cart_item_info d-flex flex-md-row">
                            <div className="cart_item_name cart_info_col col-4">
                              <div className="cart_item_title">Game</div>
                              <div className="cart_item_text">{game.name}</div>
                            </div>
                            <div className="cart_item_price cart_info_col col-4">
                              <div className="cart_item_title">Price</div>
                              <div className="cart_item_text">
                                ${game.price}
                              </div>
                            </div>
                            <div className="cart_item_price cart_info_col col-4">
                              <div className="cart_item_title">In Cart</div>
                              <div className="cart_item_text">
                                <Button
                                  variant="danger"
                                  onClick={(e) =>
                                    dispatch(removeFromCart(e, game.rawgId))
                                  }
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
              {/* Order Total */}
              <div className="order_total">
                <div className="order_total_content text-md-right">
                  <div className="order_total_title">Order Total:</div>
                  <div className="order_total_amount">
                    ${currentTotalCartPrice ? currentTotalCartPrice : 0}
                  </div>
                </div>
              </div>
              <div className="cart_buttons">
                <button
                  type="button"
                  className="button cart_button_clear"
                  onClick={(e) => searchGame(e, "")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="button cart_button_checkout"
                  onClick={(e) => handleCheckout(e)}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
