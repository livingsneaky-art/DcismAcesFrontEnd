import React, { useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import Header from "../header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddAdmin } from "../../services/authentication";
import { Add } from "@mui/icons-material";

const AddAdminForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    position: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const addSuccess = await AddAdmin(dispatch, formData);
    if (addSuccess) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/dashboard");
    }
  };

  return (
    <Box m="1rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header
          title="Add Admin User"
          subtitle="Can add admin and set the initial password. Changing password can be done through forgot password."
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: "1.5rem 2.5rem",
          m: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="First Name"
            placeholder="Type in the First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Last Name"
            placeholder="Type in the Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Email"
            type="email"
            placeholder="Type in the Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Type in the Initial Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Position"
            placeholder="Type in the Initial Position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "1rem" }}
          />

          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: "#221769" }}
            type="submit"
            startIcon={<Add />}
          >
            Add Admin
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddAdminForm;
