import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "../../../components/sidebar";
import Topbar from "../../../components/topbar";
import { useSelector } from "react-redux";

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const user = useSelector((state) => state.authenticationSlice);

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="280px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}

            />
            <Box flexGrow={1}>
                <Topbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    user={user}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
