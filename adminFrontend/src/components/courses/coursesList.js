import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TablePagination, 
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CourseForm from './createCoursesForm'; // Import the CourseForm component

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editCourseId, setEditCourseId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
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
      url = `https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses/${editCourseId}`;
      method = 'PUT';
    } else {
      url = 'https://api.thelearnskills.com/api/v1/shortTermcourse/create-short-term-course';
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

  const handleEdit = (course) => {
    setFormData({
      courseName: course.courseName,
      description: course.description,
      images: [], // Do not pre-fill images in edit form
      highlights: course.highlights,
      criteria: course.criteria,
      price: course.price,
      duration: course.duration
    });
    setEditCourseId(course._id);
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');

    fetch(`https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses/${id}`, {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container">
      <Typography variant="h5" fontWeight="bold">All Short Term Courses</Typography>
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" style={{ margin: '1rem' }} onClick={handleCreateCourse}>
        Create Course
      </Button>
      <Table aria-label="Course Table" sx={{ minWidth: 650, border: 'none' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Sr. No</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Course Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Images</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Highlights</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Criteria</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Duration</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
            <TableRow key={course._id}>
              <TableCell sx={{ fontWeight: 'bold', border: 'none' }}>{index + 1}</TableCell>
              <TableCell sx={{ border: 'none' }}>{course.courseName}</TableCell>
              <TableCell sx={{ border: 'none' }}>{course.description}</TableCell>
              <TableCell sx={{ border: 'none' }}>
                {course.images.map((image, index) => (
                  <img key={index} src={`http://localhost:8080/uploads/${image}`} alt={`Course Image ${index + 1}`} width="100" height="100" />
                ))}
              </TableCell>
              <TableCell sx={{ border: 'none' }}>{course.highlights}</TableCell>
              <TableCell sx={{ border: 'none' }}>{course.criteria}</TableCell>
              <TableCell sx={{ border: 'none' }}>{course.price}</TableCell>
              <TableCell sx={{ border: 'none' }}>{course.duration}</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <IconButton onClick={() => handleEdit(course)} color="primary">
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={courses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>

      {/* Dialog for Creating and Editing Courses */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Course' : 'Create Course'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <CourseForm
              formData={formData}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseTable;
