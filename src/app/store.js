import { configureStore } from '@reduxjs/toolkit';
import ToastMiddleware from '../middleware/ToastMiddleware';
import thunk from 'redux-thunk';

import authenticationSlice from './authenticationSlice';
import eventsSlice from './eventsSlice';
import announcementsSlice from './announcementsSlice';
import alumniSlice from './alumniSlice';
import companiesSlice from './companiesSlice';
import alumniUserSlice from './alumniUserSlice';
import adminDashboardSlice from './adminDashboardSlice';
import alumniProfileSlice from './alumniProfileSlice';
import companyUserSlice from './companyUserSlice';
import companyJobPostSlice from './companyJobPostSlice';

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    eventsSlice: eventsSlice,
    announcementsSlice: announcementsSlice,
    alumniSlice: alumniSlice,
    companiesSlice: companiesSlice,
    alumniUserSlice: alumniUserSlice,
    companyUserSlice: companyUserSlice,
    adminDashboard: adminDashboardSlice,
    alumniProfile: alumniProfileSlice,
    createJob: companyJobPostSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware, thunk),
});