import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './redux/userSlice';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import IndustrialWorkshopTable from './components/industrial/industrial';
import UniversityPartnership from './components/universityPartnership/universityPartnerShip';
import CreateColleges from './components/colleges/CreateColleges';
import CoursesList from './components/courses/coursesList';
import CollegeLeads from './components/colleges/CollegeLeads';
import CreateLongTermCourse from './components/courses/createLongTermCourse';
import CourseLeads from './components/courses/courseLeads';
import LongTermLeads from './components/courses/longTermLeads';
import Sidebar from './pages/Sidebar';
import PrivateRoute, { PrivateRoute2 } from './pages/PrivateRoute';
import CreateVocationalEducation from './components/vocationalEducation/CreateVocationalEducation';
import ProgramDetail from './components/vocationalEducation/ProgramDetails';
import CreateProgram from './components/vocationalEducation/CreateProgram';
import Register from './components/register/Register';
import CallerDashboard from './pages/CallerDashboard';
import EmployeeList from './components/register/EmployeeList'
import JobPoster from './components/jobPortal/JobPoster';
import VocationalLeads from './components/vocationalEducation/VocationalLeads'
import Tickets from './components/ticket/Ticket';
import UserProfile from './pages/userProfile';
import Meetings from './pages/Meetings'


function App() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      dispatch(login({ token, role }));
    }
  }, [dispatch]);

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
      fontFamily: 'Arimo, sans-serif',
      allvariants: { color: 'white' },
    },
  });

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute2 roleRequired='admin' />}>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          </Route>
        </Routes>

        <div style={{ display: 'flex' }}>
          {isAuthenticated && (
            <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
          )}

          <main style={{ flexGrow: 1, padding: '16px' }}>
            <Routes>
              <Route element={<PrivateRoute roleRequired="admin" />}>
                <Route path="/admin/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/colleges" element={<CreateColleges />} />
                <Route path="/get-college" element={<CollegeLeads />} />
                <Route path="/industrial" element={<IndustrialWorkshopTable />} />
                <Route path="/university-partnership" element={<UniversityPartnership />} />
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/long-term-course" element={<CreateLongTermCourse />} />
                <Route path="/short-term-lead" element={<CourseLeads />} />
                <Route path="/long-term-lead" element={<LongTermLeads />} />
                <Route path="/vocational-education" element={<CreateVocationalEducation />} />
                <Route path="/vocational-education/:_id" element={<ProgramDetail />} />
                <Route path="/create-program" element={<CreateProgram />} />
                <Route path="/employee-list" element = {<EmployeeList />} />
                <Route path="/register" element={<Register/>} />
                <Route path = "/job-poster" element={<JobPoster/>} />
                <Route path="/vocational-leads" element={<VocationalLeads/>} />
                <Route path="/ticket" element={<Tickets/>} />
                <Route path="/user/:userId" element={<UserProfile />} />
                <Route path="/meeting" element={<Meetings />} />

              </Route>

              <Route element={<PrivateRoute roleRequired="teamLeader" />}>
                <Route path="/teamLeader/dashboard" element={<CollegeLeads />} />
                <Route path="/teamLeader/short-term-leads" element={<CourseLeads />} />
                <Route path="/teamLeader/long-term-leads" element={<LongTermLeads />} />
                <Route path="/teamLeader/vocational-leads" element={<VocationalLeads/>} />

              </Route>

              <Route element={<PrivateRoute roleRequired="caller" />}>
                <Route path="/caller/dashboard" element={<CallerDashboard />} />
                <Route path="/caller/short-term-leads" element={<CourseLeads />} />
                <Route path="/caller/get-college" element={<CollegeLeads />} />
                <Route path="/caller/vocational-leads" element={<VocationalLeads/>} />
   
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
