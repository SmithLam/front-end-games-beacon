import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Detail from "./components/Detail";
import Explore from "./components/Explore";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import LoginModal from "./components/LoginModal";
import axios from "axios";

function App() {
  let dispatch = useDispatch;
  let state = useSelector((state) => state);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ProtectedRoute = (props) => {
    //if user is login, then show the detail page
    //if user is not login then show the login page
    if (state.user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const FourOhFourPage = () => {
    return (
      <div id="404page">
        <h1>404 Not Found</h1>
      </div>
    );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const loginFacebook = async (data) => {
    if (data && data.accessToken) {
      console.log(data.accessToken);
      const res = await fetch(
        `http://localhost:5000/auth/login/facebook?token=${data.accessToken}`
      );
      if (res.ok) {
        const dt = await res.json();
        console.log(dt);
        const user = dt.data;
        const token = dt.token;
        setUser(user);
        console.log(user);
        localStorage.setItem("token", dt.token);
      } else {
        console.log(res);
      }
    }
  };

  const loginGoogle = async (data) => {
    if (data && data.accessToken) {
      console.log(data.accessToken);
      let token = data.accessToken;
      const res = await fetch(
        `http://localhost:5000/auth/login/google?token=${token}`
      );
      if (res.ok) {
        const dt = await res.json();
        console.log(dt);
        const user = dt.data;
        let token = dt.token;
        setUser(user);
        console.log(user);
        localStorage.setItem("token", dt.token);
      } else {
        console.log(res);
      }
    }
  };

  const loginEmail = async (event) => {
    event.preventDefault();
    if (email && password) {
      console.log(email, password);
      let loginData = { email: email, password: password };
      await axios
        .post("http://localhost:5000/auth/login/", loginData)
        .then((res) => {
          console.log(res);
          console.log("This is the data here", res.data.data);
          const user = res.data.data.user;
          const token = res.data.data.token;
          console.log(user);
          console.log(token);
          setUser(user);
          localStorage.setItem("token", token);
        })
        .catch((err) => console.log(err));
    }
  };

  const logOut = async () => {
    const res = await fetch(`http://localhost:5000/auth/logout`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      localStorage.removeItem("token");
      setUser(null);
    } else {
      console.log("You are messing with my code somehow");
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setLoaded(true);
    }
    const res = await fetch(`http://localhost:5000/user/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const dt = await res.json();
      setUser(dt.data);
    } else {
      localStorage.removeItem("token");
    }
    setLoaded(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUser();
  }, []);

  if (!loaded) return <h1>Loading...</h1>;
  else
    return (
      <div>
        <NavBar handleShow={handleShow}></NavBar>
        <LoginModal
          show={show}
          loginEmail={loginEmail}
          loginFacebook={loginFacebook}
          loginGoogle={loginGoogle}
          handleClose={handleClose}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          user={user}
          logOut={logOut}
        ></LoginModal>
        <Switch>
          <ProtectedRoute
            path="/profile"
            render={(props) => <Profile {...props} />}
          />
          <ProtectedRoute
            path="/checkout"
            render={(props) => <Checkout {...props} />}
          />
          <Route exact={true} path="/checkout" component={Checkout} />
          <Route exact={true} path="/cart" component={Cart} />
          <Route exact={true} path="/games/:id" component={Detail} />
          <Route exact={true} path="/explore" component={Explore} />
          <Route exact={true} path="/profile" component={Profile} />
          <Route exact={true} path="/" component={MainPage} />
          <Route path="*" component={FourOhFourPage} />
        </Switch>
        <Footer></Footer>
      </div>
    );
}

export default App;
