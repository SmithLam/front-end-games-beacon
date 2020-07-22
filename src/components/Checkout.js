import React, { useEffect } from "react";
import "../styles/checkoutForm.css";

function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="row-checkout mx-2 my-2">
        <div className="col-75">
          <div className="container-checkout">
            <form action="/action_page.php">
              <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <label htmlFor="fname">
                    <i className="fa fa-user" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                  />
                  <label htmlFor="email">
                    <i className="fa fa-envelope" /> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                  />
                  <label htmlFor="adr">
                    <i className="fa fa-address-card-o" /> Address
                  </label>
                  <input
                    type="text"
                    id="adr"
                    name="address"
                    placeholder="542 W. 15th Street"
                  />
                  <label htmlFor="city">
                    <i className="fa fa-institution" /> City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                  />
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="NY"
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder={10001}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa" style={{ color: "navy" }} />
                    <i className="fa fa-cc-amex" style={{ color: "blue" }} />
                    <i
                      className="fa fa-cc-mastercard"
                      style={{ color: "red" }}
                    />
                    <i
                      className="fa fa-cc-discover"
                      style={{ color: "orange" }}
                    />
                  </div>
                  <label htmlFor="cname">Name on Card</label>
                  <input
                    type="text"
                    id="cname"
                    name="cardname"
                    placeholder="John More Doe"
                  />
                  <label htmlFor="ccnum">Credit card number</label>
                  <input
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                    placeholder="1111-2222-3333-4444"
                  />
                  <label htmlFor="expmonth">Exp Month</label>
                  <input
                    type="text"
                    id="expmonth"
                    name="expmonth"
                    placeholder="September"
                  />
                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="expyear">Exp Year</label>
                      <input
                        type="text"
                        id="expyear"
                        name="expyear"
                        placeholder={2020}
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder={352}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <label>
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  name="sameadr"
                />{" "}
                Shipping address same as billing
              </label>
              <input
                type="submit"
                defaultValue="Continue to checkout"
                className="checkout-button"
              />
            </form>
          </div>
        </div>
        <div className="col-25">
          <div className="container">
            <h4>
              Cart
              <span className="price" style={{ color: "black" }}>
                <i className="fa fa-shopping-cart" />
                <b>4</b>
              </span>
            </h4>
            <p>
              <button>Product 1</button> <span className="price">$15</span>
            </p>
            <p>
              <button>Product 2</button> <span className="price">$5</span>
            </p>
            <p>
              <button>Product 3</button> <span className="price">$8</span>
            </p>
            <p>
              <button>Product 4</button> <span className="price">$2</span>
            </p>
            <hr />
            <p>
              Total{" "}
              <span className="price" style={{ color: "black" }}>
                <b>$30</b>
              </span>
            </p>
          </div>
        </div>
      </div>
      );
    </div>
  );
}

export default Checkout;
