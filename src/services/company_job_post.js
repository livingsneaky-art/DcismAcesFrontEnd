import axios from "axios";
import { createJob } from '../app/companyJobPostSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Company`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const CompanyJobPost = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/Jobs/Create-Job', credentials);
        console.log(response);
        if(response.data.isCreate)
        {
            dispatch(
                createJob({
                    isCreate: response.data.isCreate,
                    message: response.data.message,
                })
            );
        }
        
        
    } 
    catch (error) {
        console.error('Error:', error);
    }
}