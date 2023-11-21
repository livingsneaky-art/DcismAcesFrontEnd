import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NavbarCompany from "../../../components/topbar/navbarCompany";

const LayoutCompany = () => {
  const user = useSelector((state) => state.companyUserSlice.companyProfile);

  return (
    <Box width="100%" height="100%">
      <NavbarCompany user={user} />
      <Outlet />
    </Box>
  );
};

export default LayoutCompany;
