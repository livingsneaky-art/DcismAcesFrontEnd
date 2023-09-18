import { authenticationError, userAuthenticated } from '../app/authenticationSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Auth`,
});

export const SignUpCompany = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/signup/company', credentials);
        console.log(response);

        if (response.data.isSucceed) {

            dispatch(
                userAuthenticated({
                    isSucceed: response.data.isSucceed,
                    message: null,
                    email: response.data.email,
                    token: response.data.token,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    role: response.data.role,
                })
            );
        } else {
            dispatch(
                authenticationError({
                    message: response.data.message,
                })
            );
        }


    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'An error occurred while signing up.';
        dispatch(authenticationError(errorMessage))
    }
}

export const SignUpAlumni = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/signup/alumni', credentials);
        console.log(response);

        if (response.data.isSucceed) {

            dispatch(
                userAuthenticated({
                    isSucceed: response.data.isSucceed,
                    message: null,
                    email: response.data.email,
                    token: response.data.token,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    role: response.data.role,
                })
            );
        } else {
            dispatch(
                authenticationError({
                    message: response.data.message,
                })
            );
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
        console.log(response);

        if (response.data.isSucceed) {
            dispatch(
                userAuthenticated({
                    isSucceed: response.data.isSucceed,
                    message: null,
                    email: response.data.email,
                    token: response.data.token,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    role: response.data.role,
                })
            );
        } else {
            dispatch(
                authenticationError({
                    message: response.data.message,
                })
            );
        }

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'An error occurred while signing in.';
        dispatch(authenticationError({ message: errorMessage }));
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