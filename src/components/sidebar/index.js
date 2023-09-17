import React, { useEffect, useState } from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";

import {
    ChevronLeft,
    ChevronRightOutlined,
    SettingsOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import placeholder from "../../assets/placeholder.webp";
import { navItems } from "../constant/sidebarItems";
import { tokens } from "../../theme";

const Sidebar = ({
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const handleItemClick = (path) => {
        navigate(path);
        setActive(path);
    };

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "&. MuiDrawer-paper": {
                            color: colors.grey[100],
                            backgroundColor: colors.primary[200],
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                            transition: "width 0.3s ease-in-out",
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <Box
                                color={colors.primary[100]}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        sx={{ color: colors.greenAccent[100] }}
                                    >
                                        ACES
                                    </Typography>
                                </Box>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const path = text.replace(/\s+/g, "_").toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => handleItemClick(path)}
                                            sx={{
                                                backgroundColor:
                                                    active === path ? colors.primary[400] : "transparent",
                                                color:
                                                    active === path
                                                        ? colors.blue[700]
                                                        : colors.greenAccent[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === path
                                                            ? colors.blue[600]
                                                            : colors.greenAccent[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === path && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            textTransform="none"
                            gap="1rem"
                            m="1.5rem 2rem 0 3rem"
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={placeholder}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: colors.greenAccent[100] }}
                                >
                                    Natsu Dragneel
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: colors.greenAccent[200] }}
                                >
                                    Chairman
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: colors.greenAccent[200],
                                    fontSize: "25px ",
                                }}
                            />
                        </Box>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
