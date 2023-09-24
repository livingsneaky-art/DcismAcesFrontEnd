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
import AlumniStatisticsPage from './pages/Alumni/AlumniStatisticsPage';
import AlumniLandingPage from './pages/Alumni/AlumniLandingPage';
//import Navbar from './pages/Alumni/Navbar';
//import CompanyStatisticsPage from './pages/Comapny/CompanyStatisticsPage';
//import CompanyLandingPage from './pages/Comapny/CompanyLandingPage';

const App = () => {
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
            <Routes>
              <Route path="*" element={<h2>Page not found!</h2>} />

              <Route element={<UnprotectedRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" exact element={<Login />} />
                <Route path="/signup/alumni" element={<RegisterAlumni />} />
                <Route path="/signup/company" element={<RegisterCompany />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/changepassword/:Token" element={<ChangePassword />} />
              </Route>

              <Route element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
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
                  <Route path="/alumniPage" element={<AlumniLandingPage />} />
                  <Route path="/statistics" element={<AlumniStatisticsPage />} />
                </Route>
              </Route>

              {/* Routes for the ALUMNI role */}
              {/*<Route element={<Navbar />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="/alumniPage" element={<AlumniLandingPage />} />
                  <Route path="/statistics" element={<AlumniStatisticsPage />} />
                {/* Add more routes specific to the ALUMNI role here 
                </Route>
              </Route>*/}

              {/* Routes for the ALUMNI role */}
              {/* <Route path="/alumni/*" element={<AlumniNavbar />}>
                <Route path="/dashboard" element={<AlumniDashboard />} />
                {/* Add more routes specific to the ALUMNI role here 
              </Route>*/}

            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;