import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

function PrivateRoute({ children, user, ...rest }) {
  //  const auth = user.logged;
  const auth = true;
  return auth ? <Layout>{children}</Layout> : <Navigate to="/" />;
}

export default PrivateRoute;
