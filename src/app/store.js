import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import expensesSlice from './expensesSlice';
import statisticsSlice from './statisticsSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    expensesSlice: expensesSlice,
    statisticsSlice: statisticsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware, thunk),
});