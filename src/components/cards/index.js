import React, { useState } from "react";

import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { tokens } from "../../theme";

const JobCard = ({
    _id,
    name,
    description,
    salary,
    skills,
    endDate,
    isActive,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: colors.primary[400],
                borderRadius: "0.55rem",
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color={colors.greenAccent[500]}
                    gutterBottom
                >
                    {name}
                </Typography>
                <Typography variant="h5" component="div">
                    {description}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={colors.greenAccent[400]}>
                    Expected Salary: ${Number(salary).toFixed(2)}
                </Typography>
                <Typography variant="body2">{skills.join(" ")}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: colors.grey[300],
                }}
            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Status: {isActive ? "Active" : "Expired"}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography>Posted By: Name of the Company</Typography>

                        <CheckCircleOutlineIcon
                            style={{
                                marginLeft: "5px",
                                color: colors.greenAccent[500],
                                fontSize: "1.3rem",
                            }}
                        />
                    </Box>
                    <Typography>Application Ends: {endDate}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ my: "1rem", backgroundColor: colors.greenAccent[500] }}
                        size="small"
                    >
                        View Candidates
                    </Button>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default JobCard;
