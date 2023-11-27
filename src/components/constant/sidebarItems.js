import {
  HomeOutlined,
  VerifiedUser,
  HandshakeOutlined,
  PendingActionsOutlined,
  WorkOutline,
  ListAlt,
  Diversity3,
  CalendarMonthOutlined,
  Person2,
  SupervisorAccount,
} from "@mui/icons-material";

export const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Profile",
    icon: <Person2 />,
  },

  {
    text: "Company Section",
    icon: null,
  },
  {
    text: "Verification Company",
    icon: <VerifiedUser />,
  },
  {
    text: "Companies",
    path: "/companies",
    icon: <HandshakeOutlined />,
  },
  {
    text: "Jobs",
    icon: <PendingActionsOutlined />,
  },
  {
    text: "Pending Jobs",
    icon: <WorkOutline />,
  },
  {
    text: "Alumni Section",
    icon: null,
  },
  {
    text: "Alumni",
    icon: <Diversity3 />,
  },
  {
    text: "Others",
    icon: null,
  },
  {
    text: "Announcements",
    icon: <ListAlt />,
  },
  {
    text: "Events",
    icon: <CalendarMonthOutlined />,
  },

  {
    text: "Add Admin",
    icon: <SupervisorAccount />,
  },
];
