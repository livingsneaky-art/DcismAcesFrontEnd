import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: localStorage.getItem('message') || null,
    isCreate: localStorage.getItem('isCreate') || false,
};

export const companyJobPostSlice = createSlice({
    name: 'createjob',
    initialState,
    reducers: {
        createJob: (state, action) => {
            
            localStorage.setItem('message', action.payload.message);
            localStorage.setItem('isCreate', action.payload.isCreate);

            
            state.message = action.payload.message;
            state.isCreate = action.payload.isCreate;

        },
    },
});

export const { createJob } = companyJobPostSlice.actions;

export default companyJobPostSlice.reducer;