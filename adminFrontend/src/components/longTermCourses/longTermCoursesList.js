import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CourseForm from './createCoursesForm'; // Import the CourseForm component

const CourseTable = () => {
  const [courses, setCourses] = useState([
    // { id: 1, name: 'Course 1', description: 'Description 1', images: [], highlight: 'Highlight 1', criteria: 'Criteria 1', price: '$100', duration: '3 months' },
    // { id: 2, name: 'Course 2', description: 'Description 2', images: [], highlight: 'Highlight 2', criteria: 'Criteria 2', price: '$150', duration: '4 months' },
    // // Add more courses as needed
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Fetch data from backend
    fetch('http://localhost:8080/api/v1/longTermcourse/long-term-courses', {
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
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id) => {
    // Handle edit functionality here
  };

  const handleDelete = (id) => {
    // Handle delete functionality here
  };


  const handleCreateCourse = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" style={{ margin: '1rem' }} onClick={handleCreateCourse}>
        Create Course
      </Button>
      <Table aria-label="Course Table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Images</TableCell>
            <TableCell>Highlight</TableCell>
            <TableCell>Criteria</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={course.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{/* Render images here */}</TableCell>
              <TableCell>{course.highlights}</TableCell>
              <TableCell>{course.criteria}</TableCell>
              <TableCell>{course.price}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleEdit(course.id)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(course.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Course Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create Course</DialogTitle>
        <DialogContent>
          <CourseForm onClose={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default CourseTable;
