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
import ForgetPassword from './components/user/ForgetPassword';
import EmployerRegister from './components/user/EmployerRegister';
import EmployerLogin from './components/user/EmployerLogin'
import JobPostingForm from './components/jobPortal/JobPostingForm';
import MyPostings from './components/jobPortal/MyPosting';
import ResetPasswordPage from './components/user/ResetPassword';
// import Jobs from './components/jobPortal/Jobs';
import JobDetails from './components/jobPortal/JobDetails';
import JobList from './components/jobPortal/JobList';
import Sidebar from './components/jobPortal/Sidebar';
import EmployerDashboard from './components/jobPortal/EmployerDashboard';
import GoogleAuthCallback from './components/user/GoogleAuthCallback';
// import SearchResultsPage from './components/jobPortal/SearchResultPage';
import ChangePassword from './components/user/ChangePassword'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import TermsAndCondition from './components/pages/TermsAndCondition';

// import PrivateRoute from './components/user/PrivateRoute';
import EnterpriseAndSkills from './components/enterpriseAndSkills/EnterpriseAndSkills';
import MdcFdc from './components/mdc-fdc/mdcFdc';
import ScrollToTop from './components/ScrollTop';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import RefundPolicy from './components/pages/RefundPolicy';

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
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/underGraduate" element={<UnderGraduate />} />
            {/* <Route path="/postGraduate" element={<PostGraduate />} /> */}
            <Route path="/all-courses" element={<ShortCourses type="short" />} />
            <Route path="/long-term-courses" element={<CoursesPage type="long" />} />
            <Route path="/course/:_id" element={<CourseDetails />} />
            <Route path="/internship" element={<Internship />} />
            <Route path="/industrial-workshop" element={<IndustrialWorkshops />} />
            <Route path="/underGraduate/:_id" element={<CollegeDetails />} />
            <Route path="/university-partnership" element={<UniversityPartnerships />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vocational-education" element={<VocationalEducation />} />
            <Route path="/courses/:_id" element={<VocationalCourseDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path='/profile' element={< StudentPage />} />
            <Route path='/register-employer' element = {< EmployerRegister/> } />
            <Route path="/login-employer" element = {<EmployerLogin/>} />
            <Route path="/employer-profile" element={<EmployerDashboard/>} />
            {/* <Route path="/job-post" element={<JobPostingForm/>} /> */}
            {/* <Route path="/my-postings" element={<MyPostings />} /> */}
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            {/* <Route path="/callback" element={<PrivateRoute element={PrivateRoute} />} /> */}
<Route path="/jobs" element={<JobList/>}/>

<Route path="/job/:id" element={<JobDetails/>}/>
<Route path="/auth" element={<GoogleAuthCallback />} />
{/* <Route path="/search-results" element={<SearchResultsPage />} /> */}
<Route path="/changePassword" element={<ChangePassword />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/terms-and-conditions" element={<TermsAndCondition />} /> 
<Route path="/skilling-enterprise-solution" element={<EnterpriseAndSkills/>} />
<Route path="/mdc-fdc" element={<MdcFdc/>}/>
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/refund-policy" element={<RefundPolicy/>} />


          </Routes>
        </Router>
      </CoursesProvider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
