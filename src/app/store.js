import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import expensesSlice from './expensesSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware, thunk),
});
