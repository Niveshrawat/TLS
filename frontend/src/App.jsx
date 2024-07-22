import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import UnderGraduate from './components/colleges/UnderGraduate';
import PostGraduate from './components/postgraduate/PostGraduate';
import CoursesPage from './components/courses/ShortCourses';
import CourseDetails from './components/courses/CourseDetail';
import ShortCourses from './components/courses/ShortCourses';
import Internship from './components/internship/Internship';
import IndustrialWorkshops from './components/Industrial/IndustrialWorkshop';
import ManagementCourse from './components/pages/ManagementCourse';
import Register from './components/user/Register'
// import VerifyOtp from './components/user/VerifyOtp';
import Login from './components/user/Login';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from "@mui/material/styles/createTheme";
import CollegeDetails from './components/CollegeDetails/CollegeDetails';
import UniversityPartnerships from './components/universityPartnership/UniversityPartnership';
import VocationalEducation from './components/vocational Education/IndustrialCertificate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    
      typography :{
      fontFamily:  "Arimo, sans-serif",
      allvariants: {color:"white"},
    },
    
});


function App() {
  const [otpPage, setOtpPage] = useState(false);
  return (
    <ThemeProvider theme={theme}>
       <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/underGraduate" element={<UnderGraduate />} />
          <Route path="/postGraduate" element={<PostGraduate />} />
          <Route path="/all-courses" element={<ShortCourses type="short" />} />
          <Route path="/long-term-courses" element={<CoursesPage type="long" />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/industrial-workshop" element={<IndustrialWorkshops />} />
          <Route path="/management" element={<ManagementCourse />} />
          <Route path="/underGraduate/:id" element={<CollegeDetails />}  />
          <Route path="/university-partnership" element={<UniversityPartnerships />}  />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/vocational-education" element={<VocationalEducation />} />
          {/* <Route
          path="/verify-otp"
          element={otpPage ? <VerifyOtp /> : <Register setOtpPage={setOtpPage} />}
        /> */}
         {/* <Route path="/verify-otp" element={<VerifyOtp />} /> */}
        <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
