import axios from "axios";
import { toast } from "react-toastify";

import {
  getCompanies,
  getCompaniesError,
  verifyCompanyError,
  rejectCompanyError,
  getPostError,
  updateCompany,
  getPosts,
  updatePost,
  getCandidates,
  getCandidatesError,
} from "../app/companiesSlice";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: "Bearer " + localStorage.getItem("token") };
  return config;
});

export const GetCompanies = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Company");
    dispatch(getCompanies(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getCompaniesError());
  }
};

export const RejectCompany = async (dispatch, credentials) => {
  try {
    const response = await axiosInstance.put(
      "/Company/Reject-Company",
      credentials,
    );
    dispatch(updateCompany(response.data));
    toast.success("Reject the company verification successfully");
  } catch {
    dispatch(rejectCompanyError());
  }
};

export const Verify_Company = async (dispatch, credentials) => {
  try {
    const response = await axiosInstance.put(
      "/Company/Verify-Company",
      credentials,
    );
    dispatch(updateCompany(response.data));
    toast.success("Verified the company successfully");
  } catch (error) {
    console.error("Error:", error);
    dispatch(verifyCompanyError(error.response.data));
  }
};

export const GetJobPosts = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Company/Jobs");
    dispatch(getPosts(response.data));
  } catch (error) {
    console.error("Error in GetVerifiedJobs:", error);
    dispatch(getPostError("Error fetching verified jobs."));
  }
};

export const Verify_JobPost = async (dispatch, credentials) => {
  try {
    const response = await axiosInstance.put(
      "/Company/Verify-Job-Posting",
      credentials,
    );
    dispatch(updatePost(response.data));
    toast.success("Verified the post successfully");
  } catch (error) {
    console.error("Error:", error);
    dispatch(verifyCompanyError(error.response.data));
  }
};

export const RejectJobPost = async (dispatch, credentials) => {
  try {
    const response = await axiosInstance.put(
      "/Company/Reject-Job-Posting",
      credentials,
    );
    dispatch(updatePost(response.data));
    toast.success("Deleted the post successfully");
  } catch (error) {
    console.error("Error:", error);
    dispatch(verifyCompanyError(error.response.data));
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
  } catch {
    dispatch(getCandidatesError());
    toast.error("An error occurred while deleting the announcement");
  }
};
