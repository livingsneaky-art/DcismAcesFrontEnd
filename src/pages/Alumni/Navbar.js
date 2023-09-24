import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { logout } from '../../app/authenticationSlice';
import AlumniLandingPage from './AlumniLandingPage';
import AlumniStatisticsPage from './AlumniStatisticsPage';

const Navbar = () => {
    const { isSucceed } = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#e4fff2' }}>
            <Toolbar>
                <Typography variant="h5" sx={{ color: '#000', fontFamily: 'Brush Script MT, cursive' }}>
                    ALUMNI PAGE
                </Typography>
                {isSucceed ? (
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant='link'
                            href='/alumniPage'
                            onClick={() => {
                                <AlumniLandingPage />;
                            }}
                            style={{ marginLeft: '1rem', textDecoration: 'none', color: '#000' }}
                        >
                            Alumni
                        </Button>
                        <Button
                            variant='link'
                            href='/statistics'
                            onClick={() => {
                                <AlumniStatisticsPage />;
                            }}
                            style={{ marginLeft: '1rem', textDecoration: 'none', color: '#000' }}
                        >
                            Statistics
                        </Button>
                        <Button
                            variant="link"
                            href='/signin'
                            onClick={() => {
                                dispatch(logout());
                            }}
                            style={{ marginLeft: '1rem', color: '#000' }}
                        >
                            Log out
                        </Button>
                    </div>
                ) : (
                    <div style={{ marginLeft: 'auto' }}>
                        <NavLink
                            to="/signup/alumni"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            Sign up
                        </NavLink>
                        <NavLink
                            to="/signin"
                            style={{ marginLeft: '1rem', textDecoration: 'none', color: 'inherit' }}
                        >
                            Sign in
                        </NavLink>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
