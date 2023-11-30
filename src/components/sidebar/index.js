import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../constant/sidebarItems";
import applogo from "../../assets/applogowhite.png";

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  user,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleItemClick = (path) => {
    navigate(path);
    setActive(path);
  };

  return (
    <>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiPaper-root": {
              backgroundColor: "#221769",
            },
            "&.MuiDrawer-paper": {
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              transition: "width 0.3s ease-in-out",
            },
          }}
        >
          <Box m="1.5rem 2rem 2rem 3rem">
            <Box
              color="#221769"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <img src={applogo} alt="ACES Logo" width={40} />
                </IconButton>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
                >
                  ACES
                </Typography>
              </Box>
            </Box>
            {!isNonMobile && (
              <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                sx={{ color: "white" }}
              >
                <ChevronLeft />
              </IconButton>
            )}
          </Box>

          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography
                    key={text}
                    sx={{ m: "2.25rem 0 1rem 3rem", color: "white" }}
                  >
                    {text}
                  </Typography>
                );
              }

              if (
                text === "Add Admin" &&
                user?.email !== "admin@dcismaces.com"
              ) {
                return null;
              }

              const path = text.replace(/\s+/g, "_").toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(path)}
                    sx={{
                      backgroundColor:
                        active === path ? "#f2f0f0" : "transparent",
                      color: active === path ? "#00ccff" : "white",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color: active === path ? "#00bbff" : "white",
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
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
