import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles/responsive.css";
import { Switch, Route} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Detail from "./components/Detail";
import Explore from "./components/Explore.js";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import ProfileUpdate from "./components/ProfileUpdate";
import LoginModal from "./components/LoginModal";
import Register from "./components/Register";
import { fetchUser } from "./redux/actions/userAction";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  let dispatch = useDispatch();
  let { currentUser, currentWishlistId } = useSelector((state) => state.user);
  let loaded = useSelector((state) => state.app);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const FourOhFourPage = () => {
    return (
      <div id="404page">
        <h1>404 Not Found</h1>
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUser());
  }, []);

  if (!loaded) return <h1>Loading...</h1>;
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
            <ProtectedRoute
              exact={true}
              path="/profile/update"
              component={ProfileUpdate}
            />
            <ProtectedRoute exact={true} path="/profile" component={Profile} />
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
