import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
  const { isSucceed } = useSelector((state) => state.authentication);

  return isSucceed ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes