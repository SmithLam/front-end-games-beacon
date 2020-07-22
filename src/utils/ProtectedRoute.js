import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: 10% auto;
`;

export default function ProtectedRoute({ component: Component, ...rest }) {
  let { currentUser } = useSelector((state) => state.user);
  let { loaded } = useSelector((state) => state.app);
  if (!loaded)
    return (
      <div className="sweet-loading">
        <PacmanLoader css={override} size={125} color={"black"} />;
      </div>
    );
  return currentUser ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}
