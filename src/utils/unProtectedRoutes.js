import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import CompanyLandingPage from '../pages/Company/CompanyLandingPage';
import AlumniLandingPage from '../pages/Alumni/AlumniLandingPage';
//import AlumniStatisticsPage from '../pages/Alumni/AlumniStatisticsPage';

const UnprotectedRoute = () => {
  const { isSucceed, role } = useSelector((state) => state.authentication);

  // Define your condition for rendering based on the user's role
  let content;
  switch (role) {
    case 'ALUMNI':
      //content = <AlumniLandingPage />;
      //content = <Navigate to="/alumni/alumniPage" />;
      content = <AlumniLandingPage />;
      //content = <AlumniStatisticsPage />;
      break;
    case 'COMPANY':
      content = <CompanyLandingPage />;
      break;
    case 'ADMIN':
      content = <Navigate to="/dashboard" />;
      break;
    default:
      content = <Outlet />;
      break;
  }

  return isSucceed ? content : <Outlet />;
};

export default UnprotectedRoute;