import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RoleAuth({ children, accessRole }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  if (!accessRole) {
    return children;
  }

  if (userInfo && accessRole && accessRole === userInfo?.user?.role) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default RoleAuth;
