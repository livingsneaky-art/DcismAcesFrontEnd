import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAlumni: localStorage.getItem("totalAlumni") || 0,
  totalCompany: localStorage.getItem("totalCompany") || 0,
  totalEmployed: localStorage.getItem("totalEmployed") || 0,
  totalUnEmployed: localStorage.getItem("totalUnEmployed") || 0,
  screenTopumOfUsers: localStorage.getItem("sumOfUsers") || 0,
  message: localStorage.getItem("message") || null,

  firstData: localStorage.getItem("firstData") || 0,
  secondData: localStorage.getItem("secondData") || 0,
  thirdData: localStorage.getItem("thirdData") || 0,
  fourthData: localStorage.getItem("fourthData") || 0,
  fifthData: localStorage.getItem("fifthData") || 0,
  sixData: localStorage.getItem("sixData") || 0,
  sevenData: localStorage.getItem("sevenData") || 0,
  commonJobs: [],
  totalEmployedByProgram: [],
  totalBSIT: localStorage.getItem("totalBSIT") || 0,
  totalBSCS: localStorage.getItem("totalBSCS") || 0,
  totalBSIS: localStorage.getItem("totalBSIS") || 0,
  totalICT: localStorage.getItem("totalICT") || 0,
};

export const adminDashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    adminDashboard: (state, action) => {
      localStorage.setItem("totalAlumni", action.payload.totalAlumni);
      localStorage.setItem("totalCompany", action.payload.totalCompany);
      localStorage.setItem("totalEmployed", action.payload.totalEmployed);
      localStorage.setItem("totalUnEmployed", action.payload.totalUnEmployed);
      localStorage.setItem("sumOfUsers", action.payload.sumOfUsers);
      localStorage.setItem("message", action.payload.message);

      localStorage.setItem("firstData", action.payload.firstData);
      localStorage.setItem("secondData", action.payload.secondData);
      localStorage.setItem("thirdData", action.payload.thirdData);
      localStorage.setItem("fourthData", action.payload.fourthData);
      localStorage.setItem("fifthData", action.payload.fifthData);
      localStorage.setItem("sixData", action.payload.sixData);
      localStorage.setItem("sevenData", action.payload.sevenData);

      state.totalAlumni = action.payload.totalAlumni;
      state.totalCompany = action.payload.totalCompany;
      state.totalEmployed = action.payload.totalEmployed;
      state.totalUnEmployed = action.payload.totalUnEmployed;
      state.sumOfUsers = action.payload.sumOfUsers;
      state.message = action.payload.message;

      state.firstData = action.payload.firstData;
      state.secondData = action.payload.secondData;
      state.thirdData = action.payload.thirdData;
      state.fourthData = action.payload.fourthData;
      state.fifthData = action.payload.fifthData;
      state.sixData = action.payload.sixData;
      state.sevenData = action.payload.sevenData;
      state.commonJobs = action.payload.commonJobs;
      state.totalEmployedByProgram = action.payload.totalEmployedByProgram;
      state.totalBSIT = action.payload.sevenData;
      state.totalBSCS = action.payload.totalBSCS;
      state.totalBSIS = action.payload.totalBSIS;
      state.totalICT = action.payload.totalICT;
    },
    adminDashboardError: (state, action) => {
      state.message = action.payload.message;
      state.totalAlumni = 0;
      state.totalCompany = 0;
      state.sumOfUsers = 0;
    },
  },
});

export const { adminDashboard, adminDashboardError } =
  adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
