import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NavbarAlumni from "../../../components/topbar/navbarAlumni";
import BottomNavigationBar from "../../../components/bottombar/";

const LayoutAlumni = () => {
  const user = useSelector((state) => state.alumniUserSlice.alumniProfile);

  return (
    <Box width="100%" height="100%" className="bg-slate-100">
      <NavbarAlumni user={user} />
      <Box height="60px"></Box>
      <Outlet />
      <Box height="60px" className="bg-slate-100"></Box>
      <BottomNavigationBar user={user} />
    </Box>
  );
};

export default LayoutAlumni;
