import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Login from "./pages/Public/Login";
import LandingPage from "./pages/Public/LandingPage";
import RegisterAlumni from "./pages/Public/RegisterAlumni";
import RegisterCompany from "./pages/Public/RegisterCompany";
import ForgotPassword from "./pages/Public/ForgotPassword";
import ChangePassword from "./pages/Public/ChangePassword";

import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import Jobs from "./pages/Admin/Jobs";
import VerifyCompany from "./pages/Admin/VerifyCompany";
import Companies from "./pages/Admin/Companies";
import Alumni from "./pages/Admin/Alumni";
import ViewCandidates from "./pages/Admin/ViewCandidates";
import PendingJobs from "./pages/Admin/PendingJobs";
import Events from "./pages/Admin/Events";
import Announcements from "./pages/Admin/Announcement";
import UnprotectedRoute from "./utils/unProtectedRoutes";
import ProtectedRoute from "./utils/protectedRoute";
import AnnouncementForm from "./components/forms/AnnouncementForm";
import Profile from "./pages/Admin/Profile";

import LayoutAlumni from "./pages/Alumni/Layout";
import LandingPageAlumni from "./pages/Alumni/LandingPage";
import AlumniEvents from "./pages/Alumni/Events";
import AlumniFAQ from "./pages/Alumni/Help";
import JobList from "./pages/Alumni/Jobs";
import AlumniProfile from "./pages/Alumni/Profile";

import LayoutCompany from "./pages/Company/Layout";
import LandingPageCompany from "./pages/Company/LandingPage";
import CompanyFAQ from "./pages/Company/Help";
import CompanyJobs from "./pages/Company/Jobs";
import CompanyProfile from "./pages/Company/Profile";
import CompanyCandidates from "./pages/Company/Candidates";
import CompanyEvents from "./pages/Company/Events";
import PostJob from "./pages/Company/PostJob";
import CompanyEditProfile from "./pages/Company/Profile/editProfile.js";
import CompanyInactiveJobs from "./pages/Company/Jobs/inActiveJob.js";
import ViewJobCompany from "./pages/Company/Job";
import EditJobPost from "./pages/Company/PostJob/editPost.js";
import AlumniEditProfile from "./pages/Alumni/Profile/editProfile.js";
import ViewJobAlumni from "./pages/Alumni/Job";
import CompanyApplicants from "./pages/Company/Applicants/index.js";
import AddAdminForm from "./components/forms/AddAdminForm.js";
import ViewAppliedJobAlumni from "./pages/Alumni/Job/viewAppliedJob.js";

const App = () => {
  const { theme, toggleColorMode } = useMode();

  const colorModeContextValue = useMemo(
    () => ({
      toggleColorMode: toggleColorMode,
    }),
    [toggleColorMode],
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
                <Route
                  path="/changepassword/:Token"
                  element={<ChangePassword />}
                />
              </Route>

              <Route element={<ProtectedRoute userRole="ADMIN" />}>
                <Route element={<Layout />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/verification_company"
                    element={<VerifyCompany />}
                  />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route
                    path="/job/candidates/:id"
                    element={<ViewCandidates />}
                  />
                  <Route path="/pending_jobs" element={<PendingJobs />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/events" element={<Events />} />
                  <Route
                    exact
                    path="/addAnnouncement"
                    element={<AnnouncementForm />}
                  />
                  <Route
                    exact
                    path="/editAnnouncement/:id"
                    element={<AnnouncementForm />}
                  />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add_admin" element={<AddAdminForm />} />
                </Route>
              </Route>

              {/* route for user create a layout for the alumni ang company */}

              <Route element={<ProtectedRoute userRole="ALUMNI" />}>
                <Route element={<LayoutAlumni />}>
                  <Route
                    path="/alumni/dashboard"
                    element={<LandingPageAlumni />}
                  />
                  <Route exact path="/alumni/faq" element={<AlumniFAQ />} />
                  <Route path="/alumni/jobs" element={<JobList />} />
                  <Route path="/alumni/profile" element={<AlumniProfile />} />
                  <Route
                    path="/alumni/edit-profile"
                    element={<AlumniEditProfile />}
                  />
                  <Route path="/alumni/events" element={<AlumniEvents />} />
                  <Route path="/alumni/job/:id" element={<ViewJobAlumni />} />
                  <Route
                    path="/alumni/apply/job/:id"
                    element={<ViewAppliedJobAlumni />}
                  />
                </Route>
              </Route>

              {/* route for company  */}
              <Route element={<ProtectedRoute userRole="COMPANY" />}>
                <Route element={<LayoutCompany />}>
                  <Route
                    path="/company/dashboard"
                    element={<LandingPageCompany />}
                  />
                  <Route exact path="/company/faq" element={<CompanyFAQ />} />
                  <Route path="/company/jobs" element={<CompanyJobs />} />
                  <Route path="/company/events" element={<CompanyEvents />} />
                  <Route path="/company/profile" element={<CompanyProfile />} />
                  <Route
                    path="/company/edit-profile"
                    element={<CompanyEditProfile />}
                  />
                  <Route path="/company/post-job" element={<PostJob />} />
                  <Route
                    path="/company/edit-job/:id"
                    element={<EditJobPost />}
                  />
                  <Route
                    path="/company/inactive/jobs"
                    element={<CompanyInactiveJobs />}
                  />
                  <Route
                    path="/company/job/candidates/:id"
                    element={<CompanyCandidates />}
                  />
                  <Route path="/company/job/:id" element={<ViewJobCompany />} />
                  <Route
                    path="/company/job/applicants/:id"
                    element={<CompanyApplicants />}
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
