import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Public/Login';
import LandingPage from './pages/Public/LandingPage';
import RegisterAlumni from './pages/Public/RegisterAlumni';
import RegisterCompany from './pages/Public/RegisterCompany';
import ForgotPassword from './pages/Public/ForgotPassword';
import ChangePassword from './pages/Public/ChangePassword';
import Layout from './pages/Admin/Layout';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from './pages/Admin/Dashboard';
import Jobs from './pages/Admin/Jobs';
import VerifyCompany from './pages/Admin/VerifyCompany';
import Companies from './pages/Admin/Company';
import Alumni from './pages/Admin/Alumni';
import ViewCandidates from './pages/Admin/ViewCandidates';
import PendingJobs from './pages/Admin/PendingJobs';
import FAQ from './pages/Admin/FAQ';
import Events from './pages/Admin/Events';
import Announcements from './pages/Admin/Announcement';
import UnprotectedRoute from './utils/unProtectedRoutes';
import ProtectedRoute from './utils/protectedRoute';
import AnnouncementForm from './components/forms/AnnouncementForm';
import Profile from './pages/Admin/Profile';
import LandingPageAlumni from './pages/Alumni/LandingPage.js';
import Navbar from './components/topbar/navbar';
import LandingPageCompany from './pages/Company/LandingPage';
import AccountVerify from './components/accountverify';
//import { useSelector } from 'react-redux';
//import { logout } from '../src/app/authenticationSlice';

const App = () => {
 // const { isAlumni } = useSelector((state) => state.authentication);
  const { theme, toggleColorMode } = useMode();

  const colorModeContextValue = useMemo(
    () => ({
      toggleColorMode: toggleColorMode,
    }),
    [toggleColorMode]
  );


  return (
    <ColorModeContext.Provider value={colorModeContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            {/* <Navbar /> */}

            {/* 
        <Route path="/dashboard" element={isLoggedIn ? <ChangePassword /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to='/dashboard' /> : <RegisterAlumni />} />
        <Route path="*" element={<h2>Page not found!</h2>} />
      */}

            <Routes>
              <Route path="*" element={<h2>Page not found!</h2>} />

              <Route element={<UnprotectedRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" exact element={<Login />} />
                <Route path="/signup/alumni" element={<RegisterAlumni />} />
                <Route path="/signup/company" element={<RegisterCompany />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/changepassword/:Token" element={<ChangePassword />} />
                <Route path="/accountverify" element={<AccountVerify />}  />
              </Route>

              <Route element={<ProtectedRoute userRole="ADMIN" />}>
                <Route element={<Layout />}>
                  <Route path="/admin_dashboard" element={<Dashboard />} />
                  <Route path="/verification_company" element={<VerifyCompany />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/view_candidates" element={<ViewCandidates />} />
                  <Route path="/pending_jobs" element={<PendingJobs />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/addAnnouncement" element={<AnnouncementForm />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>

              {/* route for user create a layout for the alumni ang company */}
              {/* {isAlumni === true ? ( */}
              <Route element={<ProtectedRoute userRole="ALUMNI" userVerified="true"/>}>
                <Route element={<Navbar />}>
                  <Route path="/user_dashboard" element={<LandingPageAlumni />} />
                </Route>
              </Route>
              {/* // ) : (
              //   {dispatch(logout())}
              //   <Route path="/" element={<LandingPage />} />
              // )} */}

              {/* route for company  */}
              <Route element={<ProtectedRoute userRole="COMPANY" />}>
                <Route element={<Navbar />}>
                  <Route path="/company_dashboard" element={<LandingPageCompany />} />
                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider >
    </ColorModeContext.Provider >
  );
}

export default App;