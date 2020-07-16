import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  let { currentUser } = useSelector((s) => s.user);

  return currentUser ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}

// import React from "react";
// import { Route } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
//   );
// };

// const ProtectedRoute = ({ component: Component, user, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (user) {
//           return <Component {...rest} {...props} />;
//         } else {
//           return (
//             <Redirect
//               to={{
//                 pathname: "/unauthorized",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };

// export default ProtectedRoute;
