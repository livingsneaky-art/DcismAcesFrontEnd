import  React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UnprotectedRoutes = () => {
  const { isSucceed } = useSelector((state) => state.authentication);

  return isSucceed ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default UnprotectedRoutes;
