import { createSlice, createAction } from "@reduxjs/toolkit";

// Error Actions
export const getAnnouncementsError = createAction("getAnnouncementsError");
export const getCompanyProfileError = createAction("getCompanyProfileError");
export const getEventsError = createAction("getEventsError");
export const getJobsError = createAction("getJobsError");
export const getJobError = createAction("getJobError");
export const editProfileError = createAction("editProfileError");
export const addJobPostError = createAction("addJobPostError");
export const deleteJobPostError = createAction("deleteJobPostError");
export const editJobPostError = createAction("editJobPostError");

export const companyUserSlice = createSlice({
  name: "company",
  initialState: {
    announcements: [],
    companyProfile: null,
    events: [],
    errorMessage: null,
    jobPost: [],
    job: null,
    candidates: [],
  },
  reducers: {
    getAnnouncements: (state, action) => {
      return { ...state, announcements: [...action.payload] };
    },
    getEvents: (state, action) => {
      return { ...state, events: [...action.payload] };
    },
    getCompanyProfile: (state, action) => {
      return { ...state, companyProfile: { ...action.payload } };
    },
    getJobs: (state, action) => {
      return { ...state, jobPost: { ...action.payload } };
    },
    getJob: (state, action) => {
      return { ...state, job: action.payload.data };
    },
    getCandidates: (state, action) => {
      return { ...state, candidates: action.payload.data };
    },
    addJobPost: (state, action) => {
      return { ...state, job: action.payload.data };
    },
    setErrorMessage: (state, action) => {
      return { ...state, errorMessage: action.payload };
    },
    clearErrorMessage: (state) => {
      return { ...state, errorMessage: null };
    },
    editProfile: (state, action) => {
      const updatedCompanyProfile = { ...state.companyProfile };
      for (const key in action.payload) {
        if (key in updatedCompanyProfile) {
          updatedCompanyProfile[key] = action.payload[key];
        }
      }
      return { ...state, companyProfile: updatedCompanyProfile };
    },
    deleteJobPost: (state, action) => {
      if (!Array.isArray(state.jobPost)) {
        console.error("state.jobPost is not an array:", state.jobPost);
        return state;
      }

      const postIdToDelete = action.payload.id;
      const updatedJobPosts = state.jobPost.filter(
        (job) => job.id !== postIdToDelete,
      );

      return {
        ...state,
        jobPost: updatedJobPosts,
      };
    },
    editJobPost: (state, action) => {
      if (Array.isArray(state.jobPost)) {
        const updatedJobPost = state.jobPost.map((post) => {
          if (post.id === action.payload.id) {
            return { ...post, ...action.payload };
          }
          return post;
        });

        return { ...state, jobPost: updatedJobPost };
      } else {
        console.error("state.jobPost is not an array:", state.jobPost);
        return state;
      }
    },
  },
});

export const {
  getAnnouncements,
  deleteJobPost,
  editJobPost,
  getJobs,
  getJob,
  setErrorMessage,
  getCandidates,
  clearErrorMessage,
  getCompanyProfile,
  getEvents,
  editProfile,
  addJobPost,
} = companyUserSlice.actions;

export default companyUserSlice.reducer;
