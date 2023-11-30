import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Header from "../../../components/header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteAnnouncement,
  GetAllAnnouncements,
} from "../../../services/announcement";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Add, DeleteOutline, EditNote } from "@mui/icons-material";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { formatDate } from "../../../components/constant/helper";
import AnnouncementCard from "../../../components/cards/announcementCard";
import { GetAdminProfile } from "../../../services/admin_alumni";

const Announcements = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const navigate = useNavigate();
  const announcements = useSelector(
    (state) => state.announcementsSlice.announcements,
  );
  const user = useSelector((state) => state.alumniSlice.adminProfile);

  const dispatch = useDispatch();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteOccurred, setDeleteOccurred] = useState(false);

  const handleTitleClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalOpen(true);
  };

  useEffect(() => {
    GetAllAnnouncements(dispatch);
    GetAdminProfile(dispatch);
  }, [dispatch]);

  const uniqueAnnouncements = announcements.map((announcement, index) => {
    return { ...announcement, id: announcement.id || index + 1 };
  });

  const handleDelete = (id) => {
    DeleteAnnouncement(dispatch, id)
      .then(() => {
        setDeleteOccurred(true);
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
      });

    setOpenDeletePopup(false);
  };

  console.log(user);

  useEffect(() => {
    if (deleteOccurred) {
      GetAllAnnouncements(dispatch);
      setDeleteOccurred(false);
    }
  }, [deleteOccurred, dispatch]);

  const handleDownload = (file, title) => {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `announcement-${title}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
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
      field: "description",
      headerName: "Content",
      flex: 2,
      valueGetter: (params) => {
        return params.value ? params.value : "Not Indicated";
      },
    },
    {
      field: "audience",
      headerName: "Audience",
      width: 100,
      valueGetter: (params) => {
        return params.value ? params.value : "Not Indicated";
      },
    },

    {
      field: "posted_Date",
      headerName: "Posted Date",
      flex: 1,
      valueGetter: (params) => {
        return params.value ? formatDate(params.value) : "Not Indicated";
      },
    },
    {
      field: "file",
      headerName: "File",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.row.file !== "NULL" ? (
              <button
                className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                onClick={() =>
                  handleDownload(params.row.file, params.row.title)
                }
              >
                Download File
              </button>
            ) : (
              <span style={{ color: "gray" }}>No File Uploaded</span>
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
          <Box display="flex" gap="10px">
            <IconButton
              onClick={() => navigate(`/editAnnouncement/${params.row.id}`)}
            >
              <EditNote
                style={{
                  fontSize: "20px",
                  color: "#e6b800",
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedItemId(params.row.id);
                setOpenDeletePopup(true);
              }}
              disabled={
                !params.row.admin || params.row.admin.email !== user.email
              }
            >
              <DeleteOutline
                style={{
                  fontSize: "20px",
                  color:
                    !params.row.admin || params.row.admin.email !== user.email
                      ? "#aaa"
                      : "#e2726e",
                }}
              />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="Announcement Section" subtitle="List of announcements" />
        <ToastContainer position="top-right" autoClose={3000} />
        <Box display="flex" gap="15px">
          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: "#221769" }}
            onClick={() => navigate("/addAnnouncement")}
            startIcon={<Add />}
          >
            Add Announcement
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
        {announcements.length === 0 ? (
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
            rows={uniqueAnnouncements}
            getRowId={(row) => row.id}
            columns={columns}
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
            }}
          >
            {selectedAnnouncement && (
              <div style={{ width: "50%" }} onClick={() => setModalOpen(false)}>
                <AnnouncementCard announcement={selectedAnnouncement} />
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

export default Announcements;
