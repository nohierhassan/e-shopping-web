import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "./../../servicies/authService";

const AdminRoute = async ({ path, component: Component, render, ...rest }) => {
  const is_admin = await isAdmin();
  console.log("isAdmin", is_admin);

  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        if (!is_admin) return <Redirect to="/products" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminRoute;
