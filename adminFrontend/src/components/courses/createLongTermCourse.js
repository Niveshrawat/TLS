import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CourseForm from './longTermCourseForm'; // Import the CourseForm component

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    images: [],
    highlights: '',
    criteria: '',
    price: '',
    duration: ''
  });
  const [editCourseId, setEditCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []); 

  const fetchCourses = () => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/api/v1/longTermcourse/long-term-courses', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    
    data.append('courseName', formData.courseName);
    data.append('description', formData.description);
    formData.images.forEach((image) => {
      data.append('images', image);
    });
    data.append('highlights', formData.highlights);
    data.append('criteria', formData.criteria);
    data.append('price', formData.price);
    data.append('duration', formData.duration);

    let url = '';
    let method = '';

    if (isEdit) { 
      url = `http://localhost:8080/api/v1/longTermcourse/long-term-courses/${editCourseId}`;
      method = 'PUT';
    } else {
      url = 'http://localhost:8080/api/v1/longTermcourse/create-long-term-course';
      method = 'POST';
    }

    fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    })
      .then(response => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
      .then(data => {
        if (isEdit) {
          setCourses(prevCourses => prevCourses.map(course => course._id === editCourseId ? data : course));
        } else {
          setCourses(prevCourses => [...prevCourses, data]);
        }
        handleCloseDialog();
      })
      .catch(error => console.error('Error submitting data:', error));
  };

  const handleEdit = (id) => {
    const course = courses.find(course => course._id === id);
    if (course) {
      setFormData({
        courseName: course.courseName,
        description: course.description,
        images: course.images,
        highlights: course.highlights,
        criteria: course.criteria,
        price: course.price,
        duration: course.duration
      });
      setEditCourseId(id);
      setIsEdit(true);
      setOpenDialog(true);
    } else {
      console.error(`Course with ID ${id} not found in courses array.`);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/api/v1/longTermcourse/long-term-courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
    .then(() => {
      setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
    })
    .catch(error => console.error('Error deleting data:', error));
  };

  const handleCreateCourse = () => {
    setFormData({
      courseName: '',
      description: '',
      images: [],
      highlights: '',
      criteria: '',
      price: '',
      duration: ''
    });
    setIsEdit(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prevFormData => ({
      ...prevFormData,
      images: files
    }));
  };

  return (
    <div className="longTerm">
      <Typography variant='h5' fontWeight="bold">All Long Term Courses</Typography>
      <TableContainer component={Paper}>
        <Button variant="contained" color="primary" style={{ margin: '1rem' }} onClick={handleCreateCourse}>
          Create Course
        </Button>
        <Table aria-label="Course Table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Course Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Images</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Highlights</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Criteria</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>Actions</TableCell>
            </TableRow >
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{/* Render images here */}</TableCell>
                <TableCell>{course.highlights}</TableCell>
                <TableCell>{course.criteria}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(course._id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(course._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{isEdit ? 'Edit Course' : 'Create Course'}</DialogTitle>
          <DialogContent>
            <CourseForm 
              formData={formData} 
              handleChange={handleChange}
              handleImageChange={handleImageChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {isEdit ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </div>
  );
};

export default CourseTable;
