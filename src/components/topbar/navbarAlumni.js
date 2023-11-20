import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import applogo from "../../assets/applogowhite.png";
import { BusinessCenter, Help, AccountCircle, MoreVert, Campaign, EventNote, Notifications, Info } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/authenticationSlice';
import { Button } from '@mui/material';
import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { GetAllNotificationByID, GetAllNotifications } from '../../services/alumni';

const NavbarAlumni = ({ user }) => {
    const role = user && user.role ? user.role.toLowerCase() : '';
    const notificationsAlumni = useSelector(state => state.alumniUserSlice.notifications);

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        GetAllNotifications(dispatch);
    }, [dispatch]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    }

    const [showNotification, setShowNotification] = useState(false);

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
    };

    const handleNotificationClickByID = async ({ userId, id }) => {
        try {
            console.log(userId, id);
            await GetAllNotificationByID(dispatch, userId, id);
            await GetAllNotifications(dispatch);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <Button onClick={() => navigate(`/${role}/profile`)}>My Profile</Button>
            </MenuItem>
            <MenuItem>
                <Button onClick={handleLogout}> Log out</Button>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" color="inherit" onClick={() => navigate(`/${role}/dashboard`)}>
                    <Campaign />
                </IconButton>
                <p>Announcement</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit" onClick={() => navigate(`/${role}/events`)}>
                    <EventNote />
                </IconButton>
                <p>Events</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge color="error" onClick={() => navigate(`/${role}/jobs`)}>
                        <BusinessCenter />
                    </Badge>
                </IconButton>
                <p>Job Posts</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit" onClick={() => navigate(`/${role}/faq`)}>
                    <Help />
                </IconButton>
                <p>FAQ</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge color="error" onClick={handleNotificationClick}>
                        <Notifications />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p className="capitalize">{user?.firstName} {user?.lastName}</p>
            </MenuItem>
        </Menu >
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                position: "static",
                background: "#221769",
                boxShadow: "none",
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <img src={applogo} alt="ACES Logo" width={40} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        ACES
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: "1rem" }}>
                        <IconButton size="large" color="inherit" onClick={() => navigate(`/${role}/dashboard`)}>
                            <Campaign />
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={() => navigate(`/${role}/events`)}>
                            <EventNote />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 10 jobs matches to the user"
                            color="inherit"
                        >
                            <Badge color="error" onClick={() => navigate(`/${role}/jobs`)}>
                                <BusinessCenter />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={() => navigate(`/${role}/faq`)}>
                            <Help />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label={`show ${notificationsAlumni && notificationsAlumni.length} new notifications`}
                            color="inherit"
                        >
                            <Badge color="error" badgeContent={notificationsAlumni && notificationsAlumni.length} onClick={handleNotificationClick}>
                                <Notifications />
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <img
                                src={user?.profileImage ? `data:image/jpeg;base64,${user.profileImage}` : placeholder}
                                alt="placeholder"
                                className="w-[30px] h-[30px] rounded-full border border-slate-300 "
                            />
                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                                padding="5px"
                            >
                                {user?.firstName} {user?.lastName}
                            </Typography>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {showNotification && (
                <div className="absolute right-20 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <p className="flex items-center px-4 py-2 text-sm text-gray-700">
                            <Notifications className="mr-2" /> New notification!
                        </p>
                        {notificationsAlumni && notificationsAlumni.length > 0 ? (
                            notificationsAlumni.map((notification, index) => {
                                const userData = notification.user.filter(
                                    (temp) => temp.alumniId === user.id);
                                if (userData && userData.length > 0) {
                                    return (
                                        <p
                                            key={index}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                            onClick={() => handleNotificationClickByID({ userId: userData[0].id, id: notification.id })}
                                        >
                                            <Info className="mr-2" />
                                            {`A new post titled ${notification.title} has been added.`}
                                        </p>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <p className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer">No New Notification Added</p>
                        )}
                    </div>
                </div>
            )
            }
        </Box >
    );
};

export default NavbarAlumni;


