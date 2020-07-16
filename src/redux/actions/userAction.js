export const loginFacebook = (data) => async (dispatch) => {
  if (data && data.accessToken) {
    console.log(data.accessToken);
    const res = await fetch(
      `http://localhost:5000/auth/login/facebook?token=${data.accessToken}`
    );
    if (res.ok) {
      const dt = await res.json();
      console.log(dt);
      const user = dt.data;
      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem("token", dt.token);
    } else {
      console.log(res);
    }
  }
};

export const loginGoogle = (data) => async (dispatch) => {
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
      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem("token", dt.token);
    } else {
      console.log(res);
    }
  }
};

export const loginEmail = (email, password, event) => async (dispatch) => {
  event.preventDefault();
  console.log(email, password);
  let loginData = { email: email, password: password };
  console.log(loginData);
  const res = await fetch(`http://localhost:5000/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (res.ok) {
    const dt = await res.json();
    console.log(dt);
    const user = dt.data.user;
    const token = dt.data.token;
    dispatch({ type: "LOGIN", payload: user });
    localStorage.setItem("token", token);
  } else {
    console.log(res);
  }
};

export const logOut = () => async (dispatch) => {
  const res = await fetch(`http://localhost:5000/auth/logout`, {
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
  const findUser = await fetch(`http://localhost:5000/user/profile`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (findUser.ok) {
    const dt = await findUser.json();
    const user = dt.data;
    const wl = dt.wl;
    const k = wl.map((e) => e.gameId.rawgId);
    user.wishlist = wl;
    user.k = k;
    console.log("this is fetch user dt", user);
    dispatch({ type: "LOGIN", payload: user });
  } else {
    localStorage.removeItem("token");
  }
  dispatch({ type: "LOADED" });
};

// const findWishlist = await fetch(`http://localhost:5000/wishlist`, {
//   headers: {
//     authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// });
// const wishlist = await findWishlist.json();
// console.log(wishlist.data);
