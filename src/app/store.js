import { configureStore } from "@reduxjs/toolkit";
import ToastMiddleware from "../middleware/ToastMiddleware";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import authenticationSlice from "./authenticationSlice";
import eventsSlice from "./eventsSlice";
import announcementsSlice from "./announcementsSlice";
import alumniSlice from "./alumniSlice";
import companiesSlice from "./companiesSlice";
import alumniUserSlice from "./alumniUserSlice";
import adminDashboardSlice from "./adminDashboardSlice";
import alumniProfileSlice from "./alumniProfileSlice";
import companyUserSlice from "./companyUserSlice";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// export default configureStore({
//   reducer: {
//     authentication: authenticationSlice,
//     eventsSlice: eventsSlice,
//     announcementsSlice: announcementsSlice,
//     alumniSlice: alumniSlice,
//     companiesSlice: companiesSlice,
//     alumniUserSlice: alumniUserSlice,
//     companyUserSlice: companyUserSlice,
//     adminDashboard: adminDashboardSlice,
//     alumniProfile: alumniProfileSlice,

//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware, thunk),
// });

const rootReducer = combineReducers({
  authentication: authenticationSlice,
  eventsSlice: eventsSlice,
  announcementsSlice: announcementsSlice,
  alumniSlice: alumniSlice,
  companiesSlice: companiesSlice,
  alumniUserSlice: alumniUserSlice,
  companyUserSlice: companyUserSlice,
  adminDashboard: adminDashboardSlice,
  alumniProfile: alumniProfileSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ToastMiddleware, thunk),
});

const persistor = persistStore(store);

export { store, persistor };
