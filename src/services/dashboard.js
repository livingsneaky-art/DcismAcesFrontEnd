import {
  adminDashboard,
  adminDashboardError,
} from "../app/adminDashboardSlice";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: "Bearer " + localStorage.getItem("token") };
  return config;
});

export const getStatistics = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Statistics");
    dispatch(
      adminDashboard({
        totalAlumni: response.data.totalAlumni,
        totalCompany: response.data.totalCompany,
        totalEmployed: response.data.totalEmployed,
        totalUnEmployed: response.data.totalUnEmployed,
        sumOfUsers: response.data.sumOfUsers,
        message: response.data.message,

        firstData: response.data.firstData,
        secondData: response.data.secondData,
        thirdData: response.data.thirdData,
        fourthData: response.data.fourthData,
        fifthData: response.data.fifthData,
        sixData: response.data.sixData,
        sevenData: response.data.sevenData,
        totalBSIT: response.data.totalBSIT,
        totalBSCS: response.data.totalBSCS,
        totalBSIS: response.data.totalBSIS,
        totalICT: response.data.totalICT,
        commonJobs: response.data.commonJobs,
        totalEmployedByProgram: response.data.totalEmployedByProgram,
      }),
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error.response?.data || "There is something wrong when fetching a data";
    dispatch(adminDashboardError({ message: errorMessage }));
  }
};
