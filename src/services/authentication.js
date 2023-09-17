import { authenticationError, userAuthenticated } from '../app/authenticationSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
});

export const SignUp = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/signup', credentials);
        const { data } = response;
        if (response.status === 201) {
            dispatch(userAuthenticated(data));
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'An error occurred while signing up.';
        dispatch(authenticationError(errorMessage))
    }
}

export const SignUpCompany = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/signup/company', credentials);
        const { data } = response;

        if (response.data === 201) {
            dispatch(userAuthenticated(data));
        }

    } catch (error) {
        console.log('Error:', error);
        const errorMessage = error.response?.data || 'An error occured while signing up';
        dispatch(authenticationError(errorMessage));

    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/signin', credentials);
        const { data } = response;
        console.log(data);

        if (response.status === 201) {
            dispatch(userAuthenticated(data));
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'An error occurred while signing in.';
        dispatch(authenticationError(errorMessage))
    }
}

export const SignUpGoogle = async (dispatch, token) => {
    try {
        // api call        
        const { data } = await axiosInstance.post(`/google?token=${token}`);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!')
    }
}


