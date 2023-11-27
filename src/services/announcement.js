import axios from "axios";
import {
  getAllAnnouncements,
  getAllAnnouncementsError,
  editAnnouncement,
  editAnnouncementError,
  deleteAnnouncement,
  deleteAnnouncementError,
  addAnnouncement,
  getAnnouncementByID,
  setErrorMessage,
  addAnnouncementError,
} from "../app/announcementsSlice";

import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: "Bearer " + localStorage.getItem("token") };
  return config;
});

export const GetAllAnnouncements = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Announcements");
    dispatch(getAllAnnouncements(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAllAnnouncementsError());
  }
};

export const GetAnnouncementByID = async (dispatch, id) => {
  try {
    const response = await axiosInstance.get(`/Announcements/${id}`);
    dispatch(getAnnouncementByID(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(editAnnouncementError());
  }
};

export const AddAnnouncement = async (dispatch, announcement) => {
  try {
    const formData = new FormData();
    for (const key in announcement) {
      if (key === "file" && announcement[key]) {
        formData.append(key, announcement[key]);
      } else {
        formData.append(key, announcement[key]);
      }
    }
    const response = await axiosInstance.post(
      "/Announcements/Create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.data.isPostSucceed) {
      dispatch(addAnnouncement(response.data));
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isPostSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(
      setErrorMessage(
        error.response.data || "An error occurred on the server.",
      ),
    );
    dispatch(addAnnouncementError(error.response.data));
    toast.error("An error occurred while adding the announcement");
  }
};

export const EditAnnouncement = async (dispatch, announcement, id) => {
  try {
    const formData = new FormData();
    for (const key in announcement) {
      if (key === "file" && announcement[key]) {
        formData.append(key, announcement[key]);
      } else {
        formData.append(key, announcement[key]);
      }
    }
    const response = await axiosInstance.put(
      `/Announcements/Update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.data.isEditSucceed) {
      dispatch(editAnnouncement(response.data));
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isEditSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(
      setErrorMessage(
        error.response.data || "An error occurred on the server.",
      ),
    );
    dispatch(editAnnouncementError(error.response.data));
  }
};

export const DeleteAnnouncement = async (dispatch, id) => {
  try {
    await axiosInstance.delete(`Announcements/Delete/${id}`);
    dispatch(deleteAnnouncement(id));
    toast.success("Announcement deleted successfully");
  } catch {
    dispatch(deleteAnnouncementError());
    toast.error("An error occurred while deleting the announcement");
  }
};
