import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
import { useSelector } from 'react-redux';


function App() {
  const [open, setOpen] = useState(true);
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


  const { isAuthenticated } = useSelector(state => state.admin || {});

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route element={<PrivateRoute2 roleRequired={1}  />}>

<Route path="/admin/login" element={<AdminLogin />} />
</Route>
        </Routes>
        
        <div style={{ display: 'flex' }}>
        {isAuthenticated && (
            <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
          )}
        
          <main style={{ flexGrow: 1, padding: '16px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/login" />} />
              
              
              <Route element={<PrivateRoute roleRequired={1}  />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/colleges" element={<CreateColleges />} />
                <Route path="/get-college" element={<CollegeLeads />} />
                <Route path="/industrial" element={<IndustrialWorkshopTable />} />
                <Route path="/university-partnership" element={<UniversityPartnership />} />
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/long-term-course" element={<CreateLongTermCourse />} />
                <Route path="/short-term-lead" element={<CourseLeads />} />
                <Route path="/long-term-lead" element={<LongTermLeads />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
