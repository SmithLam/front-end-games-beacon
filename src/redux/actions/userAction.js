import { fetchWishlist, fetchCart } from "./gameAction";

//  callback={(data) => dispatch(loginFacebook(data, isRemembered))}
export const loginFacebook = (data, isRemembered) => async (dispatch) => {
  if (data && data.accessToken) {
    console.log(data.accessToken);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login/facebook?token=${data.accessToken}`
    );
    if (res.ok) {
      const dt = await res.json();
      const user = dt.data;
      console.log("this is fetch user dt", user);
      console.log("this is whether you want to remember or not", isRemembered);
      if (isRemembered === true) {
        localStorage.setItem("token", dt.token);
      } else {
        localStorage.removeItem("token");
      }
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
        },
      });
      dispatch(fetchWishlist());
      dispatch(fetchCart());
      dispatch({ type: "CLOSE-LOGIN-MODAL" });
      dispatch({ type: "LOADED" });
    } else {
      console.log(res);
      alert("Cannot log in via Facebook!");
    }
  }
};

// onSuccess={(data) => dispatch(loginGoogle(data, isRemembered))}
export const loginGoogle = (data, isRemembered) => async (dispatch) => {
  if (data && data.accessToken) {
    console.log(data.accessToken);
    let token = data.accessToken;
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login/google?token=${token}`
    );
    if (res.ok) {
      const dt = await res.json();
      const user = dt.data;
      console.log("this is fetch user dt", user);
      console.log("this is whether you want to remember or not", isRemembered);
      if (isRemembered === true) {
        localStorage.setItem("token", dt.token);
      } else {
        localStorage.removeItem("token");
      }
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
        },
      });
      dispatch(fetchWishlist());
      dispatch(fetchCart());
      dispatch({ type: "CLOSE-LOGIN-MODAL" });
      dispatch({ type: "LOADED" });
    } else {
      console.log(res);
      alert("Cannot log in via Google!");
    }
  }
};

// <Form onSubmit={(e) => dispatch(loginEmail(e, email, password, isRemembered))}></Form>
export const loginEmail = (event, email, password, isRemembered) => async (
  dispatch
) => {
  event.preventDefault();
  console.log(email, password);
  let loginData = { email: email, password: password };
  console.log(loginData);
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  if (res.ok) {
    const dt = await res.json();
    const user = dt.data;
    console.log("this is fetch user dt", user);
    console.log("this is whether you want to remember or not", isRemembered);
    if (isRemembered === true) {
      localStorage.setItem("token", dt.token);
    } else {
      localStorage.removeItem("token");
    }
    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
      },
    });
    dispatch(fetchWishlist());
    dispatch(fetchCart());
    dispatch({ type: "CLOSE-LOGIN-MODAL" });
    dispatch({ type: "LOADED" });
  } else {
    console.log(res);
    alert("Login Unsuccessful!");
  }
};

export const logOut = () => async (dispatch) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  } else {
    console.log("You are messing with my code somehow");
  }
};

export const fetchUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch({ type: "LOADED" });
    return;
  }
  const findUser = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (findUser.ok) {
    const dt = await findUser.json();
    const user = dt.data;
    console.log("this is fetch user dt", user);
    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
      },
    });
    dispatch(fetchWishlist());
    dispatch(fetchCart());
    dispatch({ type: "LOADED" });
  } else {
    localStorage.removeItem("token");
  }
};
