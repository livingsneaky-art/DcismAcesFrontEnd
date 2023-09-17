import {
    HomeOutlined,
    VerifiedUser,
    HandshakeOutlined,
    PendingActionsOutlined,
    WorkOutline,
    ListAlt,
    Diversity3,
    LiveHelpOutlined,
    CalendarMonthOutlined,
} from "@mui/icons-material";

export const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
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
        text: "Verification Alumni",
        icon: <VerifiedUser />,
    },
    {
        text: "Others",
        icon: null,
    },
    {
        text: "FAQ",
        icon: <LiveHelpOutlined />,
    },
    {
        text: "Events",
        icon: <ListAlt />,
    },
    {
        text: "Calendar",
        icon: <CalendarMonthOutlined />,
    },
];
