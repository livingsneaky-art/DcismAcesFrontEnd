import { authenticationError, forgotPasswordRequestSuccess, userAuthenticated, userChangePassword } from '../app/authenticationSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Auth`,
});

export const SignUpCompany = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/signup/company', credentials);

        if (response.data.isSucceed) {

            dispatch(
                userAuthenticated({
                    isAlumni: response.data.isAlumni,
                    isSucceed: response.data.isSucceed,
                    message: response.data.message,
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

        if (response.data.isSucceed) {

            dispatch(
                userAuthenticated({
                    isAlumni: response.data.isAlumni,
                    isSucceed: response.data.isSucceed,
                    message: response.data.message,
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

        if (response.data.isSucceed) {
            dispatch(
                userAuthenticated({
                    isAlumni: response.data.isAlumni,
                    isSucceed: response.data.isSucceed,
                    message: response.data.message,
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
        const response = await axiosInstance.post(`/google?token=${token}`);
        if (response.data.isSucceed) {
            dispatch(
                userAuthenticated({
                    isAlumni: response.data.isAlumni,
                    isSucceed: response.data.isSucceed,
                    message: response.data.message,
                    email: response.data.email,
                    token: response.data.token,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    role: response.data.role,
                })
            );
        } 
    } catch(error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'This is google: An error occurred while signing in.';
        dispatch(authenticationError({ message: errorMessage }));
    }
}

export const resetPasswordRequest = async (dispatch, credentials) => {
    // try {
    //     const response = await axiosInstance.post('/forgotpassword', credentials);
    //     console.log(response.data.message);
    //     dispatch(forgotPasswordRequestSuccess({ message: response.data.message }))
    // } catch (error) {
    //     console.error('Error:', error);
    //     const errorMessage = error.response?.data || 'An error occurred while signing in.';
    //     dispatch(authenticationError({ message: errorMessage }));
    // }

    try {
        const response = await axiosInstance.post('/forgotpassword', credentials);
        console.log(response)
        if (response.data.isSucceed) {
            dispatch(
                forgotPasswordRequestSuccess({
                    isSucceed: response.data.isSucceed,
                    message: response.data.message,
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
        const errorMessage = error.response?.data || 'An error occurred while requesting to change password.';
        dispatch(authenticationError({ message: errorMessage }));
    }
}

export const changePassword  = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/changepassword', credentials);

        if (response.data.isSucceed) {
            dispatch(
                userChangePassword({
                    isSucceed: response.data.isSucceed,
                    message: response.data.message,
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
        const errorMessage = error.response?.data || 'An error occurred while changing password.';
        dispatch(authenticationError({ message: errorMessage }));
    }
}