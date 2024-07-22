import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CourseTable = () => {
  const [courseLeads, setCourseLeads] = useState([]);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Fetch data from backend
    fetch('http://localhost:8080/api/v1/sc/short-term-certificates', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add your token if required
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCourseLeads(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id) => {
    // Handle edit functionality here
    console.log(`Edit course with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete functionality here
    setCourseLeads(prevCourses => prevCourses.filter(courseLead => courseLead.id !== id));
    console.log(`Delete course with ID: ${id}`);
  };

  return (
    <div>
      <Typography variant="h5" fontWeight="bold">Short Term Leads</Typography>
    <TableContainer component={Paper}>
      <Table aria-label="course table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Sr. No</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Email ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Location</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Course Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseLeads.map((courseLead, index) => (
            <TableRow key={courseLead.id}>
              <TableCell sx={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
              <TableCell>{courseLead.phoneNumber}</TableCell>
              <TableCell>{courseLead.emailId}</TableCell>
              <TableCell>{courseLead.location}</TableCell>
              <TableCell>{courseLead.category}</TableCell>
              <TableCell>{courseLead.courseName}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(courseLead.id)} sx={{color:'blue'}}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(courseLead.id)} sx={{color:'red'}}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default CourseTable;
