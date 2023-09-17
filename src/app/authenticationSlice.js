import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    isLoggedIn: false,
    user: null,
    username: null,
    error: null,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userAuthenticated: (state, action) => {
            sessionStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true,
                username: action.payload.username,
                user: action.payload.user
            }
        },
        authenticationError: (state, action) => {
            return {
                ...state,
                error: action.payload,
            }
        },
        logout: () => {
            sessionStorage.clear();
            return {
                initialState,
            };
        },
    }
});

export const { userAuthenticated, logout, authenticationError } = authenticationSlice.actions;

export default authenticationSlice.reducer;
