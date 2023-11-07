import axios from "axios";
//import { toast } from 'react-toastify';

import {
    getCompanies,
    getCompaniesError,
    verifyCompany,
    verifyCompanyError,
    rejectCompany,
    rejectCompanyError,
    getUnverifiedCompanies,
    getVerifiedPost,
    getPostError,
    getUnverifiedPost,
    verifyPost,
    //  rejectPost
} from '../app/companiesSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetCompanies = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Company');
        dispatch(getCompanies(response.data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(getCompaniesError())
    }
}

export const GetUnverifiedCompanies = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Company');
        const unverifiedCompanies = response.data.filter(company => {
            return !company.isVerified && company.moa !== null;
        });
        dispatch(getUnverifiedCompanies(unverifiedCompanies));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getCompaniesError());
    }
}

export const RejectCompany = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.put('/Company/Reject-Company', credentials)
        dispatch(rejectCompany(response.data));
    } catch {
        dispatch(rejectCompanyError());
    }
}

export const Verify_Company = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.put('/Company/Verify-Company', credentials)
        dispatch(verifyCompany(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(verifyCompanyError(error.response.data));
    }
}

export const GetVerifiedJobs = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Company/Jobs');
        const verifiedJobs = response.data.filter(job => job.status === true);
        dispatch(getVerifiedPost(verifiedJobs));
    } catch (error) {
        console.error('Error in GetVerifiedJobs:', error);
        dispatch(getPostError('Error fetching verified jobs.'));
    }
}

export const GetUnverifiedJobs = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Company/Jobs');
        const unverifiedJobs = response.data.filter(job => !job.status);
        dispatch(getUnverifiedPost(unverifiedJobs));
    } catch (error) {
        console.error('Error in GetUnverifiedJobs:', error);
        dispatch(getPostError('Error fetching unverified jobs.'));
    }
}

export const Verify_JobPost = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.put('/Company/Verify-Job-Posting', credentials)
        console.log(response);
        dispatch(verifyPost(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(verifyCompanyError(error.response.data));
    }
}

// export const RejectJobPost = async (dispatch, id) => {
//     try {
//         await axiosInstance.delete(`Company/Delete/${id}`);
//         dispatch(rejectPost(id));
//         toast.success('Announcement deleted successfully');
//     } catch {
//         dispatch(rejectCompanyError());
//         toast.error('An error occurred while deleting the announcement');
//     }
// }