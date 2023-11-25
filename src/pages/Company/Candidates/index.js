import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import {
  SendInviteCandidate,
  ViewAllCandidates,
} from "../../../services/company";
import { getJobsError } from "../../../app/companyUserSlice";

import { styled } from "@mui/material/styles";
import {
  Button,
  CircularProgress,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { ViewCandidatesColumns } from "../../../components/constant/adminColumnHeaders";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Favorite, ForwardToInbox, MoreVert, Share } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "50%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const CompanyCandidates = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [invitationLoading, setInvitationLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ViewAllCandidates(dispatch, id);
        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        dispatch(getJobsError(error.response?.data));
      }
    };

    fetchData();
  }, [dispatch, id, invitationLoading]);

  const handleSendInvite = async (jobId, alumniId) => {
    try {
      setInvitationLoading(true);

      const isSuccess = await SendInviteCandidate(dispatch, jobId, alumniId);

      if (isSuccess) {
        toast.success("Invitation sent successfully!");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
    } finally {
      setInvitationLoading(false);
    }
  };

  const handleDownload = (file, firstName, lastName) => {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `moa-${firstName} ${lastName}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const columns = [
    ...ViewCandidatesColumns,
    {
      field: "resume",
      headerName: "Uploaded Resume",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.row.alumni.resume ? (
              <button
                className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                onClick={() =>
                  handleDownload(
                    params.row.alumni.resume,
                    params.row.alumni.firstName,
                    params.row.alumni.lastName,
                  )
                }
              >
                Download Resume
              </button>
            ) : (
              <span style={{ color: "gray" }}>No Resume</span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor:
                  params.row.status || !params.row.job.isActive
                    ? "#aaa"
                    : "#221769",
                color: "#dbf5ee",
              }}
              onClick={() =>
                handleSendInvite(params.row.jobId, params.row.alumniId)
              }
              disabled={
                !params.row.job.isActive ||
                invitationLoading ||
                params.row.status
              }
              startIcon={<ForwardToInbox />}
            >
              {invitationLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Invite"
              )}
            </Button>
          </>
        );
      },
    },
  ];

  const filtered_candidates = candidates
    ? candidates.filter((candidate) => candidate.jobId === Number(id))
    : [];

  return (
    <div className="bg-slate-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2 items-center justify-center">
        <div className="mx-4 sm:mx-0 bg-white p-4 space-y-2 w-full">
          <h1 className="Uppercase text-xl font-bold">List of Candidates</h1>
          <p>These are the list of alumni that matches your post.</p>

          {loading ? (
            <div className="flex items-center justify-center">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }}>
              {filtered_candidates.length === 0 ? (
                <p>No candidates available.</p>
              ) : (
                <DataGrid
                  sx={{
                    padding: "20px",
                    "& .MuiDataGrid-toolbarContainer": {
                      flexDirection: "row-reverse",
                      color: "#221769",
                    },
                    "& .MuiButtonBase-root": {
                      color: "#221769",
                    },
                  }}
                  rows={filtered_candidates}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },

                    sorting: {
                      sortModel: [{ field: "score", sort: "desc" }],
                    },
                  }}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                  pageSizeOptions={[10]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              )}
              <RecipeReviewCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCandidates;
