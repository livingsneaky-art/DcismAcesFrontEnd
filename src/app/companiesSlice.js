import { createSlice, createAction } from "@reduxjs/toolkit";

export const rejectCompanyError = createAction("rejectCompanyError");
export const verifyCompanyError = createAction("verifyCompanyError");
export const getCompaniesError = createAction("getCompaniesError");
export const getPostError = createAction("getPostError");
export const getCandidatesError = createAction("getCandidatesError");
export const getApplicantsError = createAction("getApplicantsError");
export const getNotificationError = createAction("getNotificationError");

export const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    posts: [],
    candidates: [],
    applicants: [],
    notifications: [],
    notification: null,
  },
  reducers: {
    getCompanies: (state, action) => {
      state.companies = action.payload;
    },
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getCompanyByID: (state, action) => {
      const updatedCompany = state.companies.map((company) => {
        if (company.id === action.payload.id) {
          return { ...company, ...action.payload };
        }
        return company;
      });

      return { ...state, companies: updatedCompany };
    },
    getCandidates: (state, action) => {
      return { ...state, candidates: action.payload.data };
    },
    getNotifications: (state, action) => {
      return { ...state, notifications: [...action.payload] };
    },
    getApplicants: (state, action) => {
      return { ...state, applicants: action.payload.data };
    },
    getNotification: (state, action) => {
      return { ...state, notification: action.payload.data };
    },
    updateCompany: (state, action) => {
      const unverified_companies = state.companies.map((company) => {
        if (company.id === action.payload.id) {
          company = action.payload;
        }
        return company;
      });
      return { ...state, companies: [...unverified_companies] };
    },
    updatePost: (state, action) => {
      const unverified_post = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload;
        }
        return post;
      });
      return { ...state, posts: [...unverified_post] };
    },
    rejectPost: (state, action) => {
      const unverified_post = state.posts.filter(
        (post) => post.id !== action.payload.id,
      );
      return { ...state, posts: [...unverified_post] };
    },
  },
});

export const {
  getCompanies,
  getPosts,
  getCompanyByID,
  updateCompany,
  updatePost,
  rejectPost,
  getCandidates,
  getNotifications,
  getNotification,
} = companiesSlice.actions;

export default companiesSlice.reducer;
