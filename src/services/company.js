import axios from "axios";
import {
  addJobPost,
  addJobPostError,
  deleteJobPost,
  deleteJobPostError,
  editJobPost,
  editJobPostError,
  editProfile,
  editProfileError,
  getAnnouncements,
  getAnnouncementsError,
  getCandidates,
  getCompanyProfile,
  getCompanyProfileError,
  getEvents,
  getEventsError,
  getJob,
  getJobError,
  getJobs,
  getJobsError,
  setErrorMessage,
} from "../app/companyUserSlice";
import { toast } from "react-toastify";
import { getNotification, getNotifications } from "../app/companiesSlice";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Company`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: "Bearer " + localStorage.getItem("token") };
  return config;
});

export const GetCompanyProfile = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Profile");
    dispatch(getCompanyProfile(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getCompanyProfileError());
  }
};

export const GetAllAnnouncements = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Announcements");
    const announcements = response.data.filter((announcement) => {
      return (
        announcement.audience === "Company" || announcement.audience === "All"
      );
    });
    dispatch(getAnnouncements(announcements));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAnnouncementsError());
  }
};

export const GetAllEvents = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Events");
    const events = response.data.filter((event) => {
      return event.audience === "Company" || event.audience === "All";
    });
    dispatch(getEvents(events));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getEventsError());
  }
};

export const GetAllJobs = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Jobs");
    dispatch(getJobs(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobsError());
  }
};

export const EditProfile = async (dispatch, credentials) => {
  try {
    const formData = new FormData();
    for (const key in credentials) {
      if (key === "file" && credentials[key]) {
        formData.append(key, credentials[key]);
      } else {
        formData.append(key, credentials[key]);
      }
    }
    const response = await axiosInstance.put("/Profile-Edit", formData, {
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
    dispatch(
      setErrorMessage(
        error.response.data || "An error occurred on the server.",
      ),
    );
    dispatch(editProfileError(error.response.data));
  }
};

export const PostJob = async (dispatch, job) => {
  try {
    const response = await axiosInstance.post("/Jobs/Create-Job", job);
    if (response.data.isPostSucceed) {
      dispatch(addJobPost(response.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    return response.data.isPostSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(addJobPostError(error.response.data));
  }
};

export const GetJob = async (dispatch, id) => {
  try {
    const response = await axiosInstance.get(`/Jobs/Get-Job/${id}`, id);
    dispatch(getJob(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const ViewAllCandidates = async (dispatch, id) => {
  try {
    const response = await axiosInstance.get(
      `/Jobs/Get-Job/${id}/View-Candidates`,
      id,
    );
    dispatch(getCandidates(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const ViewAllApplicants = async (dispatch, id) => {
  try {
    const response = await axiosInstance.get(
      `/Jobs/Get-Job/${id}/View-Applicants`,
      id,
    );
    dispatch(getCandidates(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const DeleteJob = async (dispatch, id) => {
  try {
    await axiosInstance.delete(`/Jobs/Delete-Job-Post/${id}`, id);
    dispatch(deleteJobPost(id));
  } catch (error) {
    console.error("Error:", error);
    dispatch(deleteJobPostError(error.response.data));
  }
};

export const UpateJobPost = async (dispatch, job) => {
  try {
    const response = await axiosInstance.put("/Jobs/Edit-Job-Post", job);
    console.log(response.data);
    if (response.data.isEditSucceed) {
      dispatch(editJobPost(response.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    return response.data.isEditSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(editJobPostError(error.response.data));
  }
};

export const CloseJobPost = async (dispatch, job) => {
  try {
    const response = await axiosInstance.put("/Jobs/Close-Job-Post", job);
    if (response.data.isEditSucceed) {
      dispatch(editJobPost(response.data));
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    dispatch(editJobPostError(error.response.data));
  }
};

export const SendInviteCandidate = async (dispatch, jobId, alumniId) => {
  try {
    const response = await axiosInstance.put(
      `/Jobs/Get-Job/${jobId}/Candidates/${alumniId}`,
      null,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.data.isEditSucceed) {
      dispatch(editJobPost(response.data));
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
    dispatch(editProfileError(error.response.data));
  }
};

export const SendInviteApplicant = async (dispatch, jobId, alumniId) => {
  try {
    const response = await axiosInstance.put(
      `/Jobs/Get-Job/${jobId}/Application/${alumniId}`,
      null,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.data.isEditSucceed) {
      dispatch(editJobPost(response.data));
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
    dispatch(editProfileError(error.response.data));
  }
};

export const GetAllNotificationsCompany = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Notifications");
    dispatch(getNotifications(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const GetAllNotificationByID = async (dispatch, userId, id) => {
  try {
    const response = await axiosInstance.get(
      `/Notifications/${id}/Get-Notification/${userId}`,
      id,
      userId,
    );
    dispatch(getNotification(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};
