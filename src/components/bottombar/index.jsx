import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  BusinessCenter,
  AccountCircle,
  Campaign,
  EventNote,
  Help,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const BottomNavigationBar = ({ user }) => {
  const role = user && user.role ? user.role.toLowerCase() : "";

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  return (
    <div className="absolute md:hidden">
      <BottomNavigation
        sx={{ width: "100%", bottom: 0 }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="fixed sm:hidden"
      >
        <BottomNavigationAction
          label="Feed"
          icon={<Campaign />}
          onClick={() => navigate(`/${role}/dashboard`)}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Events"
          icon={<EventNote />}
          onClick={() => navigate(`/${role}/events`)}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Jobs"
          icon={<BusinessCenter />}
          onClick={() => navigate(`/${role}/jobs`)}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="FAQ"
          icon={<Help />}
          onClick={() => navigate(`/${role}/faq`)}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="User"
          icon={<AccountCircle />}
          onClick={() => navigate(`/${role}/profile`)}
        ></BottomNavigationAction>
      </BottomNavigation>
    </div>
  );
};

export default BottomNavigationBar;
