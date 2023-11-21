import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import AccountVerify from "../components/accountverify/index";

const ProtectedRoute = ({ userRole }) => {
  const { isSucceed, role, isAccess } = useSelector(
    (state) => state.authentication,
  );

  const isAuthorized = role === userRole;

  if (isAccess === false) {
    if (!isAuthorized || !isSucceed) {
      return <Navigate to="/" />;
    } else {
      return <AccountVerify />;
    }
  } else {
    if (isAccess === true) {
      return <Outlet />;
    }
  }
};

export default ProtectedRoute;
