import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/cart_styles.css";
import "../styles/cart_responsive.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 10% auto;
`;

function Cart() {
  let { currentCart, totalPrice } = useSelector((s) => s.user);
  let { loaded } = useSelector((s) => s.app);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!loaded || !currentCart) {
    return (
      <div className="d-flex flex-row justify-content-center">
        <PacmanLoader css={override} size={125} color={"black"} />;
      </div>
    );
  }
  return (
    <div>
      <div className="cart_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="cart_container">
                <div className="cart_title">Shopping Cart</div>
                <div className="cart_items">
                  <ul className="cart_list">
                    <li className="cart_item clearfix">
                      <div className="cart_item_image">
                        <img src="images/shopping_cart.jpg" alt="" />
                      </div>
                      <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                        <div className="cart_item_name cart_info_col">
                          <div className="cart_item_title">Name</div>
                          <div className="cart_item_text">MacBook Air 13</div>
                        </div>
                        <div className="cart_item_color cart_info_col">
                          <div className="cart_item_title">Color</div>
                          <div className="cart_item_text">
                            <span style={{ backgroundColor: "#999999" }} />
                            Silver
                          </div>
                        </div>
                        <div className="cart_item_quantity cart_info_col">
                          <div className="cart_item_title">Quantity</div>
                          <div className="cart_item_text">1</div>
                        </div>
                        <div className="cart_item_price cart_info_col">
                          <div className="cart_item_title">Price</div>
                          <div className="cart_item_text">$2000</div>
                        </div>
                        <div className="cart_item_total cart_info_col">
                          <div className="cart_item_title">Total</div>
                          <div className="cart_item_text">$2000</div>
                        </div>
                      </div>
                    </li>
                    {currentCart.map((game, index) => {
                      return (
                        <li key={index} className="cart_item clearfix">
                          <div className="cart_item_image">
                            <img src={game.cover} id="cart-image" alt="" />
                          </div>
                          <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                            <div className="cart_item_name cart_info_col">
                              <div className="cart_item_title">Name</div>
                              <div className="cart_item_text">{game.name}</div>
                            </div>
                            <div className="cart_item_price cart_info_col">
                              <div className="cart_item_title">Price</div>
                              <div className="cart_item_text">
                                ${game.price}
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
                    <div className="order_total_amount">${totalPrice}</div>
                  </div>
                </div>
                <div className="cart_buttons">
                  <button type="button" className="button cart_button_clear">
                    Remove Cart List
                  </button>
                  <button type="button" className="button cart_button_checkout">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
