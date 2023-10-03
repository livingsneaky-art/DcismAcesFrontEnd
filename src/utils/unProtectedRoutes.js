import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AccountVerify from '../components/accountverify/index';

const UnprotectedRoute = () => {
  const { isSucceed, role, isAlumni } = useSelector((state) => state.authentication);
  if(isAlumni === false){
    return isSucceed ? <AccountVerify /> : <Outlet />;
  }else {
    let content;
    switch (role) {
      case 'ALUMNI':
        content = <Navigate to="/user_dashboard" />;
        break;
      case 'COMPANY':
        content = <Navigate to="/company_dashboard" />;
        break;
      case 'ADMIN':
        content = <Navigate to="/admin_dashboard" />;
        break;
      default:
        content = <Outlet />;
        break;
    }
  
    return isSucceed ? content : <Outlet />;
  }
 
};

export default UnprotectedRoute;