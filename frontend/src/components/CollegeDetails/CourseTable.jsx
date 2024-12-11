import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const CoursesTable = () => {
  const { _id } = useParams();
  const [courses, setCourses] = useState([]);
  const [aboutCourses, setAboutCourses] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/college/coursesAndFees/${_id}`);
        console.log('API Response:', response.data); // Debug log
  
        if (Array.isArray(response.data) && response.data.length > 0) {
          const { courses = [], aboutCourses = '' } = response.data[0]; // Access first element
          setCourses(courses);
          setAboutCourses(aboutCourses);
        } else {
          setCourses([]); // Handle case where array is empty
          setAboutCourses('');
        }
      } catch (err) {
        setError('Failed to fetch course data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [_id]);
  
  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h4">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: '#fff',
        marginBottom: '2rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Courses
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
        {aboutCourses || 'No information available about courses.'}
      </Typography>
      <Table
        sx={{
          '& .MuiTableCell-root': {
            border: '1px solid #ddd',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell><strong>Course Name</strong></TableCell>
            <TableCell><strong>Tuition Fee</strong></TableCell>
            <TableCell><strong>Eligibility</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.courseName || 'N/A'}</TableCell>
                <TableCell>{course.tutionFee || 'N/A'}</TableCell>
                <TableCell>{course.eligibility || 'N/A'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No courses available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CoursesTable;
