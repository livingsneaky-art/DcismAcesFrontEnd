import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  IconButton,
} from "@mui/material";
import Header from "../../../components/header";
import placeholder from "../../../assets/placeholder.png";
import {
  EditAdminProfile,
  GetAdminProfile,
} from "../../../services/admin_alumni";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Save } from "@mui/icons-material";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const profileData = useSelector((state) => state.alumniSlice.adminProfile);
  const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);
  const [formValid, setFormValid] = useState(true);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    middleName: profileData.middleName !== null ? profileData.middleName : "",
    position: profileData.position,
    fileUpload:
      profileData && profileData.profileImage ? profileData.profileImage : null,
    email: profileData.email,
    role: profileData.role,
  });

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value === "" ? "" : value,
    }));
  };

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setCurrentlySelectedImage(imageData);
        setUserData((prevUserData) => ({
          ...prevUserData,
          fileUpload: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.middleName === "") {
      setFormValid(false);
      return;
    } else {
      setFormValid(true);
      console.log(userData);
      const isEditSucceed = await EditAdminProfile(dispatch, userData);

      if (isEditSucceed) {
        const profileData = await GetAdminProfile(dispatch);
        setUserData(profileData);
        setIsEditing(false);
      }
    }
  };

  useEffect(() => {
    if (!isEditing) {
      const fetchData = async () => {
        const profileData = await GetAdminProfile(dispatch);
        setUserData({
          ...userData,
          fileUpload: profileData.profileImage,
        });
      };

      fetchData();
    }
  }, [isEditing, dispatch, userData]);

  return (
    <form onSubmit={handleSubmit}>
      <Box m="1.5rem 2.5rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Header
            title="Profile Page"
            subtitle="Please complete your profile"
          />
          <ToastContainer position="top-right" autoClose={3000} />
        </Box>

        <Card
          sx={{
            width: "80%",
            height: "400px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: "1 0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-center",
              flexDirection: "columrn",
              padding: "1rem",
            }}
          >
            {isEditing ? (
              <>
                <label
                  htmlFor="fileInput"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageInputChange}
                    name="fileUpload"
                  />
                  <img
                    src={
                      currentlySelectedImage ||
                      `data:image/jpeg;base64,${userData.fileUpload}` ||
                      placeholder
                    }
                    alt="User Profile"
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                  <IconButton
                    component="span"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        pointerEvents: "none",
                      },
                    }}
                  >
                    <Edit
                      color="primary"
                      sx={{ fontSize: 30, cursor: "pointer" }}
                    />
                  </IconButton>
                </label>
              </>
            ) : (
              <img
                src={
                  userData?.fileUpload
                    ? `data:image/jpeg;base64,${userData.fileUpload}`
                    : placeholder
                }
                alt="User Profile"
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>

          <CardContent sx={{ flex: "1 0 auto", padding: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                  First Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {isEditing ? (
                  <TextField
                    name="firstName"
                    value={userData?.firstName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography
                    variant="h3"
                    sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                  >
                    {userData?.firstName ? userData.firstName : "Not indicated"}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                  Middle Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {isEditing ? (
                  <TextField
                    name="middleName"
                    value={userData?.middleName || ""}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!formValid && userData.middleName === ""}
                    helperText={
                      !formValid &&
                      userData.middleName === "" &&
                      "Middle Name is required"
                    }
                  />
                ) : (
                  <Typography
                    variant="h3"
                    sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                  >
                    {userData?.middleName !== null &&
                    userData?.middleName !== undefined &&
                    userData?.middleName !== ""
                      ? userData.middleName
                      : "Not indicated"}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                  Last Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {isEditing ? (
                  <TextField
                    name="lastName"
                    value={userData?.lastName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography
                    variant="h3"
                    sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                  >
                    {userData?.lastName ? userData.lastName : "Not indicated"}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                  Position:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {isEditing ? (
                  <TextField
                    name="position"
                    value={userData?.position}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <Typography
                    variant="h3"
                    sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                  >
                    {userData?.position ? userData.position : "Not indicated"}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h3"
                  sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                >
                  {userData?.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                  Role:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h3"
                  sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                >
                  {userData?.role}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              {isEditing ? (
                <div className="flex items-center mt-6">
                  <div className="flex gap-10 flex-1 justify-center">
                    <Button
                      type="button"
                      variant="contained"
                      size="medium"
                      style={{
                        backgroundColor: "#3da58a",
                        color: "#dbf5ee",
                      }}
                      onClick={handleSubmit}
                      startIcon={<Save />}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center mt-6">
                  <div className="flex gap-10 flex-1 justify-center">
                    <Button
                      type="button"
                      variant="contained"
                      size="medium"
                      style={{
                        backgroundColor: "#FFC107",
                        color: "#FFFFFF",
                      }}
                      startIcon={<Edit />}
                      onClick={toggleEditing}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </form>
  );
};

export default Profile;
