import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Header from "../header";
import RichTextEditor from "./RichTextEditor";
import { useDispatch } from "react-redux";
import {
  AddAnnouncement,
  EditAnnouncement,
  GetAnnouncementByID,
} from "../../services/announcement";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory
import { editAnnouncementError } from "../../app/announcementsSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Add, Save } from "@mui/icons-material";

const audiences = ["All", "Company", "Alumni"];

const AnnouncementForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audience: "All",
    fileUpload: null,
    updatedTime: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [announcementDataLoaded, setAnnouncementDataLoaded] = useState(false);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        if (id) {
          const announcementData = await GetAnnouncementByID(dispatch, id);
          if (announcementData) {
            setFormData(announcementData);
            setAnnouncementDataLoaded(true);
          }
        }
      } catch (error) {
        dispatch(editAnnouncementError());
        console.error("Error:", error);
      }
    };

    if (id) {
      fetchAnnouncementData();
    } else {
      setAnnouncementDataLoaded(true);
    }
  }, [id, dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const currentDate = new Date();
      const editedFormData = {
        ...formData,
        updatedTime: currentDate.toISOString(),
      };

      const editSuccess = await EditAnnouncement(dispatch, editedFormData, id);
      if (editSuccess) {
        toast.success("Announcement edited successfully");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/announcements");
      }
    } else {
      const addSuccess = await AddAnnouncement(dispatch, formData);
      if (addSuccess) {
        toast.success("Announcement added successfully");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/announcements");
      }
    }
  };

  return (
    <Box m="1rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header
          title={id ? "Edit Announcement" : "Add Announcement"}
          subtitle=""
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
      {announcementDataLoaded ? (
        <Paper elevation={3} sx={{ p: "1.5rem 2.5rem" }}>
          <form onSubmit={handleFormSubmit}>
            <Grid item xs={12} sm={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                }}
              >
                <label>Title: </label>
                <TextField
                  placeholder="Type in the title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  variant="outlined"
                  fullWidth
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label> {id ? "Change File:" : "Add File:"}</label>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) =>
                    setFormData({ ...formData, fileUpload: e.target.files[0] })
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <label>Intended Audience: </label>
                <Select
                  labelId="program-graduated-label"
                  id="program-graduated"
                  value={formData.audience}
                  onChange={(e) =>
                    setFormData({ ...formData, audience: e.target.value })
                  }
                  style={{ marginLeft: "5px" }}
                >
                  {audiences.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <label>Description: </label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              {id ? (
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "#3da58a",
                    color: "#dbf5ee",
                    marginTop: "3rem",
                  }}
                  startIcon={<Save />}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  type="submite"
                  variant="contained"
                  size="medium"
                  style={{
                    backgroundColor: "#3da58a",
                    color: "#dbf5ee",
                    marginTop: "3rem",
                  }}
                  startIcon={<Add />}
                >
                  Submit Announcement
                </Button>
              )}
            </Grid>
          </form>
        </Paper>
      ) : (
        <p>Loading announcement data...</p>
      )}
    </Box>
  );
};

export default AnnouncementForm;
