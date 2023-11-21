import React, { useEffect, useState } from "react";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import Header from "../../../components/header";
import { useDispatch, useSelector } from "react-redux";
import {
  GetJobPosts,
  RejectJobPost,
  Verify_JobPost,
} from "../../../services/admin_company";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "../../../components/constant/helper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ViewJobAdmin from "../Jobs/job";

const PendingJobs = () => {
  const posts = useSelector((state) => state.companiesSlice.posts);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteOccurred, setDeleteOccurred] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    GetJobPosts(dispatch);
  }, [dispatch]);

  const uniquePost = posts.map((job, index) => {
    return { ...job, id: job.id || index + 1 };
  });

  const verifiedPost = uniquePost.filter((post) => !post.status);

  const handleAcceptJobPost = async (id) => {
    try {
      const credentials = {
        id: id,
        // status: true,
      };
      await Verify_JobPost(dispatch, credentials);
      await GetJobPosts(dispatch);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (id) => {
    RejectJobPost(dispatch, id)
      .then(() => {
        setDeleteOccurred(true);
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
      });

    setOpenDeletePopup(false);
  };

  useEffect(() => {
    if (deleteOccurred) {
      GetJobPosts(dispatch);
      setDeleteOccurred(false);
    }
  }, [deleteOccurred, dispatch]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleTitleClick = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const verifyJobColumn = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "position",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={() => handleTitleClick(params.row)}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "location",
      headerName: "Job Location",
      width: 200,
      valueGetter: (params) => {
        return params.value ? params.value : "Not Indicated";
      },
    },
    {
      field: "salary",
      headerName: "Expected Salary",
      width: 200,
      valueGetter: (params) => {
        return params.value ? params.value : "Not Indicated";
      },
    },
    {
      field: "slots",
      headerName: "Slots ",
      width: 200,
      valueGetter: (params) => {
        return params.value ? params.value : "Not Indicated";
      },
    },
    {
      field: "companyName",
      headerName: "Posted by",
      width: 200,
      valueGetter: (params) => {
        if (params.row.company && params.row.company.companyName) {
          return params.row.company.companyName;
        } else {
          return "Not Indicated";
        }
      },
    },
    {
      field: "expiration_Date",
      headerName: "End of Application ",
      width: 200,
      valueGetter: (params) => {
        return params.value ? formatDate(params.value) : "Not Indicated";
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" gap="1rem">
            <Button
              variant="contained"
              size="medium"
              style={{
                backgroundColor: "#4cceac",
                color: "#dbf5ee",
              }}
              onClick={() => {
                handleAcceptJobPost(params.row.id);
              }}
            >
              Post
            </Button>
            <Button
              variant="contained"
              size="medium"
              style={{
                backgroundColor: "#db4f4a",
                color: "#dbf5ee",
              }}
              onClick={() => {
                setSelectedItemId(params.row.id);
                setOpenDeletePopup(true);
              }}
            >
              Reject
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header
          title="Pending Job Posting"
          subtitle="Companies wanted to post jobs"
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
      <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
        {verifiedPost.length === 0 ? (
          <Typography>No Data Available</Typography>
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
            rows={verifiedPost}
            getRowId={(row) => row.id}
            columns={verifyJobColumn}
            style={{ width: "100%" }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
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
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
      >
        <Fade in={modalOpen}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            {selectedPost && (
              <div
                style={{
                  width: "60%",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                onClick={() => setModalOpen(false)}
              >
                <ViewJobAdmin jobData={selectedPost} />
              </div>
            )}
          </div>
        </Fade>
      </Modal>

      <ConfirmationDialog
        open={openDeletePopup}
        onClose={() => setOpenDeletePopup(false)}
        onConfirm={() => {
          if (selectedItemId) {
            handleDelete(selectedItemId);
          }
        }}
      />
    </Box>
  );
};

export default PendingJobs;
