import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAlumni: localStorage.getItem('isAlumni') || false,
    isSucceed: localStorage.getItem('isSucceed') || false,
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    message: localStorage.getItem('message') || null,
    firstName: localStorage.getItem('firstName') || null,
    lastName: localStorage.getItem('lastName') || null,
    role: localStorage.getItem('role') || null,
    //forgotPasswordRequestSuccess: false,

};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userAuthenticated: (state, action) => {
            localStorage.setItem('isAlumni', action.payload.isAlumni);
            localStorage.setItem('isSucceed', action.payload.isSucceed);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('message', action.payload.message);
            localStorage.setItem('firstName', action.payload.firstName);
            localStorage.setItem('lastName', action.payload.lastName);
            localStorage.setItem('role', action.payload.role);

            state.isAlumni = action.payload.isAlumni;
            state.token = action.payload.token;
            state.isSucceed = action.payload.isSucceed;
            state.email = action.payload.email;
            state.message = action.payload.message;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.role = action.payload.role;
        },
        authenticationError: (state, action) => {
            const { message } = action.payload;
            state.isAlumni = false;
            state.isSucceed = false;
            state.message = message;
            state.email = null;
            state.token = null;
        },
        logout: () => {
            localStorage.clear();
            return initialState;
        },
        clearAccount: () => {
            localStorage.clear();
            return initialState;
        },
        forgotPasswordRequestSuccess: (state, action) => {
            //state.forgotPasswordRequestSuccess = true;
            state.isAlumni = action.payload.isAlumni;
            state.isSucceed = action.payload.isSucceed;
            state.message = action.payload.message;
        },
        clearForgotPasswordRequestStatus: (state) => {
            state.isAlumni = false;
            state.isSucceed = false;
            state.message = null;
        },
        userChangePassword: (state, action) => {
            state.isAlumni = action.payload.isAlumni;
            state.isSucceed = action.payload.isSucceed;
            state.message = action.payload.message;;
        },
    },
});

export const { userAuthenticated, logout, clearAccount, authenticationError, forgotPasswordRequestSuccess, clearForgotPasswordRequestStatus, userChangePassword } = authenticationSlice.actions;

export default authenticationSlice.reducer;