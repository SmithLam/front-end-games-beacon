import React from "react";
import { Route, Redirect} from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  let { currentUser } = useSelector((state) => state.user);
  let { loaded } = useSelector((state) => state.app);
  if (!loaded) return <div>Loading...</div>;
  return currentUser ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}
