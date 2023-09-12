import { React } from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Public/Login';
import LandingPage from './pages/Public/LandingPage';
import RegisterAlumni from './pages/Public/RegisterAlumni';
import RegisterCompany from './pages/Public/RegisterCompany';
import ForgotPassword from './pages/Public/ForgotPassword';
import UnprotectedRoutes from './utils/unProtectedRoutes';
import Layout from './pages/Admin/Layout';


const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>

        <Route element={<UnprotectedRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/signup" element={<RegisterAlumni />} />
          <Route path="/signup/company" element={<RegisterCompany />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        {/* 
        <Route path="/dashboard" element={isLoggedIn ? <ChangePassword /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to='/dashboard' /> : <RegisterAlumni />} />
        <Route path="*" element={<h2>Page not found!</h2>} />
      */}

        <Route path="/home" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
