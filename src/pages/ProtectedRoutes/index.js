import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// receives component and any other props represented by ...rest
const ProtectedRoutes = ({ element: Component }) => {
  // get cookie from browser if logged in
  const token = cookies.get("TOKEN");
  console.log(token);
  // return route if there is a valid token set in the cookie
  if (token) {
    return (
      <Component />
    );
  } else {
    // return the user to the landing page if there is no valid token set
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }
}

export default ProtectedRoutes