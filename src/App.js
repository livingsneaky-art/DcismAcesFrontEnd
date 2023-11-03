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
import Companies from './pages/Admin/Companies';
import Alumni from './pages/Admin/Alumni';
import ViewCandidates from './pages/Admin/ViewCandidates';
import PendingJobs from './pages/Admin/PendingJobs';
import Events from './pages/Admin/Events';
import Announcements from './pages/Admin/Announcement';
import UnprotectedRoute from './utils/unProtectedRoutes';
import ProtectedRoute from './utils/protectedRoute';
import AnnouncementForm from './components/forms/AnnouncementForm';
import Profile from './pages/Admin/Profile';

import LayoutAlumni from './pages/Alumni/Layout';
import AlumniFAQ from './pages/Alumni/A_Help.js';
import AlumniJobs from './pages/Alumni/A_Jobs.js';
import AlumniNotif from './pages/Alumni/A_Notif.js';
import AlumniSearch from './pages/Alumni/A_SearchPage';
import AlumniEditProfile from './pages/Alumni/A_EditProfile';
import AlumniViewJob from './pages/Alumni/A_Job';
import AlumniApplyJob from './pages/Alumni/A_ApplyJob'
import LandingPageAlumni from './pages/Alumni/LandingPage';
import AlumniProfile from './pages/Alumni/Profile';
import AlumniEvents from './pages/Alumni/Events/index.js';

import LayoutCompany from './pages/Company/Layout';
import CompanyEvents from './pages/Company/LandingPage/C_Events.js';
import CompanyFAQ from './pages/Company/C_Help.js';
import CompanyJobs from './pages/Company/C_Jobs.js';
import CompanyNotif from './pages/Company/C_Notifs.js';
import CompanyProfile from './pages/Company/C_Profile.js';
import CompanyEditProfile from './pages/Company/C_EditProfile.js'
import CompanyAddPosting from './pages/Company/C_CreatePost.js'
import CompanyViewCandidates from './pages/Company/C_ViewCandidates.js'


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

              <Route element={<ProtectedRoute userRole="ADMIN" />}>
                <Route element={<Layout />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/verification_company" element={<VerifyCompany />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/view_candidates" element={<ViewCandidates />} />
                  <Route path="/pending_jobs" element={<PendingJobs />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/events" element={<Events />} />
                  <Route exact path="/addAnnouncement" element={<AnnouncementForm />} />
                  <Route exact path="/editAnnouncement/:id" element={<AnnouncementForm />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>

              {/* route for user create a layout for the alumni ang company */}

              <Route element={<ProtectedRoute userRole="ALUMNI" />}>
                <Route element={<LayoutAlumni />} >
                  <Route path="/alumni/dashboard" element={<LandingPageAlumni />} />
                  <Route exact path="/alumni/faq" element={<AlumniFAQ />} />
                  <Route path="/alumni/jobs" element={<AlumniJobs />} />
                  <Route path="/alumni/notifications" element={<AlumniNotif />} />
                  <Route path="/alumni/search" element={<AlumniSearch />} />
                  <Route path="/alumni/profile" element={<AlumniProfile />} />
                  <Route path="/alumni/edit-profile" element={<AlumniEditProfile />} />
                  <Route path="/alumni/job" element={<AlumniViewJob />} />
                  <Route path="/alumni/apply-job" element={<AlumniApplyJob />} />
                  <Route path="/alumni/events" element={<AlumniEvents />} />
                </Route>
              </Route>

              {/* route for company  */}
              <Route element={<ProtectedRoute userRole="COMPANY" />}>
                <Route element={<LayoutCompany />} >
                  <Route path="/company/dashboard" element={<CompanyEvents />} />
                  <Route exact path="/company/faq" element={<CompanyFAQ />} />
                  <Route path="/company/jobs" element={<CompanyJobs />} />
                  <Route path="/company/notifications" element={<CompanyNotif />} />
                  <Route path="/company/profile" element={<CompanyProfile />} />
                  <Route path="/company/edit-profile" element={<CompanyEditProfile />} />
                  <Route path="/company/add-posting" element={<CompanyAddPosting />} />
                  <Route path="/company/view-candidates" element={<CompanyViewCandidates />} />
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