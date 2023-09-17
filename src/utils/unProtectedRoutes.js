// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import { userAuthenticated } from '../app/authenticationSlice';

// const UnprotectedRoutes = () => {
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     const user = useSelector((state) => state.auth.user);
//     const userRole = user ? user.role : null;

//     const roleToDashboardPath = {
//         admin: '/admin-dashboard',
//         alumni: '/alumni-dashboard',
//         company: '/company-dashboard',
//     };

//     const dashboardPath = roleToDashboardPath[userRole] || '/dashboard';

//     return isAuthenticated ? <Navigate to={dashboardPath} /> : <Outlet />;
// };

// export default UnprotectedRoutes;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userAuthenticated } from '../app/authenticationSlice';

const UnprotectedRoutes = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token !== undefined && token !== null) {
            dispatch(userAuthenticated({ token: token }))
        }
    }, [dispatch]);

    return isLoggedIn ? <Navigate to='/admin' /> : <Outlet />;
};

export default UnprotectedRoutes;