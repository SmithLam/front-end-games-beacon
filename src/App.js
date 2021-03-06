import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles/responsive.css";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Detail from "./components/Detail";
import Explore from "./components/Explore.js";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import LoginModal from "./components/LoginModal";
import Register from "./components/Register";
import Email from "./components/Email";
import Password from "./components/Password";
import { fetchUser } from "./redux/actions/userAction";
import ProtectedRoute from "./utils/ProtectedRoute";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: 10% auto;
`;

function App() {
  let dispatch = useDispatch();
  let loaded = useSelector((state) => state.app);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const FourOhFourPage = () => {
    return (
      <div id="404page" className="text-center">
        <h1>404 Not Found</h1>
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUser());
  }, [dispatch]);

  if (!loaded)
    return (
      <div className="sweet-loading">
        <PacmanLoader css={override} size={125} color={"black"} />;
      </div>
    );
  else
    return (
      <div>
        <NavBar handleShow={handleShow}></NavBar>
        <LoginModal show={show} handleClose={handleClose}></LoginModal>
        <div id="section">
          <Switch>
            <ProtectedRoute
              exact={true}
              path="/checkout"
              component={Checkout}
            />
            <Route exact={true} path="/cart" component={Cart} />
            <Route exact={true} path="/games/:gameId" component={Detail} />
            <Route exact={true} path="/explore" component={Explore} />
            <ProtectedRoute exact={true} path="/profile" component={Profile} />
            <Route
              exact={true}
              path="/resetpassword/:token"
              component={Password}
            />
            <Route exact={true} path="/email" component={Email} />
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/" component={MainPage} />
            <Route path="*" component={FourOhFourPage} />
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    );
}

export default App;
