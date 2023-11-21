import axios from "axios";
import { toast } from "react-toastify";

import {
  getAlumnusByID,
  addAlumni,
  editAlumni,
  deleteAlumni,
  getAllAlumniError,
  addAlumniError,
  editAlumniError,
  deleteAlumniError,
  getProfile,
  getProfileError,
  editProfile,
  editProfileError,
  getAlumni,
  deleteVerifyAlumni,
  setErrorMessage,
} from "../app/alumniSlice";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: "Bearer " + localStorage.getItem("token") };
  return config;
});

export const GetAdminProfile = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Profile");
    dispatch(getProfile(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getProfileError());
  }
};

export const GetAlumni = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Alumni");
    dispatch(getAlumni(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAllAlumniError("Error fetching alumni data."));
  }
};

export const GetAlumniByID = async (dispatch, id) => {
  try {
    const response = await axiosInstance.get(`/Get-Alumni/${id}`);
    dispatch(getAlumnusByID(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAllAlumniError());
  }
};

export const AddAlumni = async (dispatch, alumni) => {
  try {
    const response = await axiosInstance.post("/Alumni/Add-Alumni", alumni);
    if (response.data.isPostSucceed) {
      dispatch(addAlumni(response.data));
      toast.success(response.data.message);
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isPostSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(addAlumniError(error.response.data));
  }
};

export const EditAlumni = async (dispatch, alumni) => {
  try {
    const response = await axiosInstance.put("/Alumni/Edit-Alumni", alumni);
    if (response.data.isEditSucceed) {
      dispatch(editAlumni(response.data));
      toast.success(response.data.message);
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isEditSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(editAlumniError(error.response.data));
  }
};

export const AddAlumniCSV = async (dispatch, formData) => {
  try {
    const response = await axiosInstance.post("/Alumni/Add-CSV", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.id && response.data.id.length > 0) {
      const errorMessage = `The following IDs already exist: ${response.data.id.join(
        ", ",
      )}. ${response.data.message}`;
      dispatch(setErrorMessage(errorMessage));
      toast.error(errorMessage);
    } else {
      toast.success(response.data.message);
    }
    dispatch(addAlumni(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(addAlumniError(error.response.data));
  }
};

export const VerifyAlumni = async (dispatch, credentials) => {
  try {
    const response = await axiosInstance.put(
      "/Alumni/Verify-Alumni",
      credentials,
    );
    dispatch(editAlumni(response.data));
    toast.success(response.data.message);
  } catch (error) {
    console.error("Error:", error);
    dispatch(editAlumni(error.response.data));
  }
};

export const DeleteAlumni = async (dispatch, id) => {
  try {
    await axiosInstance.delete(`Alumni/Reject-Alumni/${id}`);
    dispatch(deleteAlumni(id));
  } catch (error) {
    console.error("Error deleting alumni:", error);
    dispatch(deleteAlumniError());
  }
};

export const DeleteAlumniVerify = async (dispatch, id) => {
  try {
    await axiosInstance.delete(`Alumni/Reject-Alumni/${id}`);
    dispatch(deleteVerifyAlumni(id));
  } catch (error) {
    console.error("Error deleting alumni:", error);
    dispatch(deleteAlumniError());
  }
};

export const EditAdminProfile = async (dispatch, credentials) => {
  try {
    const formData = new FormData();
    for (const key in credentials) {
      if (key === "file" && credentials[key]) {
        formData.append(key, credentials[key]);
      } else {
        formData.append(key, credentials[key]);
      }
    }
    const response = await axiosInstance.put("Profile-Edit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.isEditSucceed) {
      dispatch(editProfile(response.data));
      toast.success(response.data.message);
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }

    return response.data.isEditSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(editProfileError(error.response.data));
  }
};
