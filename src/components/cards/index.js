import React, { useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { ReportProblemOutlined } from "@mui/icons-material";
import { formatDate } from "../constant/helper";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColor = job.isActive ? "#4cceac" : "#666666";

  return (
    <Card
      sx={{
        display: "flex",
        borderLeft: `5px solid ${statusColor}`,
        borderRadius: "0.55rem",
        boxShadow: "none",
        marginBottom: "1rem",
        flexDirection: "column",
        borderTop: "0.5px solid #e0e0e0",
        borderBottom: "0.5px solid #e0e0e0",
        borderRight: "0.5px solid #e0e0e0",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="#221769" gutterBottom>
          {job.position ? job.position : "Not Indicated"}
        </Typography>

        <Typography>
          Expected Salary:{job.salary ? job.salary : "Not Indicated"}
        </Typography>
        <Typography>
          Skills Required:
          {job?.targetSkills ? (
            job?.targetSkills.length === 0 ? (
              <p>No skills indicated</p>
            ) : (
              <p>{job?.targetSkills.map((skill) => skill.skill).join(", ")}</p>
            )
          ) : (
            <p>No skills data available</p>
          )}
        </Typography>
        <Typography>Slots: {job.slots}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          style={{
            my: "1rem",
            backgroundColor: "#3da58a",
          }}
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            Status: {job.isActive ? "Active" : "Inactive"}
          </Typography>

          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>Posted by: </Typography>
            <Typography>{job.company.companyName}</Typography>
            {job?.company?.isVerified ? (
              <CheckCircleOutlineIcon
                style={{
                  marginLeft: "5px",
                  color: "#4cceac",
                  fontSize: "1.3rem",
                }}
              />
            ) : (
              <ReportProblemOutlined
                style={{
                  marginLeft: "5px",
                  color: "#db4f4a",
                  fontSize: "1.3rem",
                }}
              />
            )}
          </div>

          <Typography>Job Location: {job.location}</Typography>
          <Typography>
            Years Experience:{" "}
            {job.yearsofExp ? job.yearsofExp : "Not indicated"}
          </Typography>
          <Typography>
            Application Ends: {formatDate(job.expiration_Date)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              my: "1rem",
              backgroundColor: "#221769",
            }}
            size="small"
            onClick={() => navigate(`/job/candidates/${job.id}`)}
          >
            View Candidates
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default JobCard;
