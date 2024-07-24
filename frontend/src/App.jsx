import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import UnderGraduate from './components/colleges/UnderGraduate';
// import PostGraduate from './components/postgraduate/PostGraduate';
import CoursesPage from './components/courses/ShortCourses';
import CourseDetails from './components/courses/CourseDetail';
import ShortCourses from './components/courses/ShortCourses';
import Internship from './components/internship/Internship';
import IndustrialWorkshops from './components/Industrial/IndustrialWorkshop';
import ManagementCourse from './components/pages/ManagementCourse';
import Register from './components/user/Register';
import Login from './components/user/Login';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from "@mui/material/styles/createTheme";
import CollegeDetails from './components/CollegeDetails/CollegeDetails';
import UniversityPartnerships from './components/universityPartnership/UniversityPartnership';
import VocationalEducation from './components/vocational Education/IndustrialCertificate';
import VocationalCourseDetail from './components/vocational Education/VocationalCourseDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CoursesProvider } from './components/vocational Education/CourseContent';
import StudentPage from './components/studentDashboard/StudentPage';
import ForgetPassword from './components/user/ForgetPassword'

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
  typography: {
    fontFamily: "Arimo, sans-serif",
    // allVariants: { color: "black" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CoursesProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/underGraduate" element={<UnderGraduate />} />
            {/* <Route path="/postGraduate" element={<PostGraduate />} /> */}
            <Route path="/all-courses" element={<ShortCourses type="short" />} />
            <Route path="/long-term-courses" element={<CoursesPage type="long" />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/internship" element={<Internship />} />
            <Route path="/industrial-workshop" element={<IndustrialWorkshops />} />
            <Route path="/management" element={<ManagementCourse />} />
            <Route path="/underGraduate/:id" element={<CollegeDetails />} />
            <Route path="/university-partnership" element={<UniversityPartnerships />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vocational-education" element={<VocationalEducation />} />
            <Route path="/courses/:courseId" element={<VocationalCourseDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path='/profile' element={< StudentPage />} />

          </Routes>
        </Router>
      </CoursesProvider>
    </ThemeProvider>
  );
}

export default App;
