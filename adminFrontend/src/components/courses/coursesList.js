import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TablePagination, 
  Typography, Drawer, Box, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CourseForm from './createCoursesForm'; // Import the CourseForm component

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
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
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterCourseName, setFilterCourseName] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch('https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  
      .then(response => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(`HTTP error! status: ${response.status}, message: ${error.message}`);
          });
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('courseName', formData.courseName);
    data.append('description', formData.description);
    formData.images.forEach((image) => {
      data.append('images', image);
      console.log(image)
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
          setFilteredCourses(prevCourses => prevCourses.map(course => course._id === editCourseId ? data : course));
        } else {
          setCourses(prevCourses => [...prevCourses, data]);
          setFilteredCourses(prevCourses => [...prevCourses, data]);
        }
        handleCloseDialog();
      })
      .catch(error => console.error('Error submitting data:', error));
  };

  const handleEdit = (course) => {
    setFormData({
      courseName: course.courseName,
      description: course.description,
      images: course.images,
      highlights: course.highlights,
      criteria: course.criteria,
      price: course.price,
      duration: course.duration
    });
    setEditCourseId(course._id);
    setIsEdit(true);
    setOpenDialog(true);
    console.log("image:",course.images);
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
      setFilteredCourses(prevCourses => prevCourses.filter(course => course._id !== id));
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

  const toggleFilterDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setFilterDrawerOpen(open);
  };

  const handleFilterCourseNameChange = (event) => {
    setFilterCourseName(event.target.value);
  };

  const handleFilterPriceChange = (event) => {
    setFilterPrice(event.target.value);
  };

  const applyFilters = () => {
    let filtered = courses;

    if (filterCourseName) {
      filtered = filtered.filter(course =>
        course.courseName.toLowerCase().includes(filterCourseName.toLowerCase())
      );
    }

    if (filterPrice) {
      const [min, max] = filterPrice.split('-').map(Number);
      filtered = filtered.filter(course => course.price >= min && course.price <= max);
    }

    setFilteredCourses(filtered);
    setFilterDrawerOpen(false);
  };

  const clearFilters = () => {
    setFilterCourseName(''); // Clear course name filter
    setFilterPrice(''); // Clear price filter
    setFilteredCourses(courses); // Reset to the full list of courses
    setFilterDrawerOpen(false); // Optionally close the drawer
  };
  
  

  return (
    <div className="container" style={{ marginTop: '10px' }}>
      <Typography variant="h5" fontWeight="bold">ALL SHORT TERM COURSES</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 , marginTop:'2rem'}}>
        <Box display="flex" justifyContent="space-between" p={2}  >
          <Button variant="contained" color="primary" onClick={handleCreateCourse}>
            CREATE COURSE
          </Button>
          <Button variant="contained" color="secondary" onClick={toggleFilterDrawer(true)}>
            FILTER
          </Button>
        </Box>
        <Table aria-label="Course Table" sx={{ minWidth: 650, border: 'none' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: 'gray' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>SR. NO</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>COURSE NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>DESCRIPTION</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>IMAGES</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>HIGHLIGHTS</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>CRITERIA</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>PRICE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>DURATION</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
              <TableRow key={course._id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', border: 'none' }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none', color: 'blue'}}>{course.courseName}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{course.description}</TableCell>
                <TableCell sx={{ border: 'none' }}>
                {course.images && course.images.map((image, idx) => (
  <img
    key={idx}
    src={`https://api.thelearnskills.com/${image}`}
    alt={`Course ${course.courseName}`}
    style={{ width: '100px', height: '100px', marginRight: '5px' }}
  />
))}

                  
                </TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{course.highlights}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{course.criteria}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{course.price}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{course.duration}</TableCell>
                <TableCell sx={{ border: 'none' }}>
                  <IconButton onClick={() => handleEdit(course)}>
                    <EditIcon sx={{ color: 'blue' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(course._id)}>
                    <DeleteIcon sx={{ color: 'red' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredCourses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? 'Edit Course' : 'Create Course'}</DialogTitle>
        <DialogContent>
          <CourseForm 
            formData={formData} 
            handleChange={handleChange} 
            handleImageChange={handleImageChange} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEdit ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>

      <Drawer anchor="right" open={filterDrawerOpen} onClose={toggleFilterDrawer(false)}>
  <Box sx={{ width: 300, p: 2 }}>
    <Typography variant="h6" gutterBottom>Filters</Typography>
    <TextField
      label="Course Name"
      value={filterCourseName}
      onChange={handleFilterCourseNameChange}
      fullWidth
      margin="normal"
    />
    <FormControl fullWidth margin="normal">
      <InputLabel id="filter-price-label">Price</InputLabel>
      <Select
        labelId="filter-price-label"
        value={filterPrice}
        onChange={handleFilterPriceChange}
        label="Price"
      >
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="0-500">0-500 Rs</MenuItem>
        <MenuItem value="500-1000">500-1000 Rs</MenuItem>
        <MenuItem value="1000-2000">1000-2000 Rs</MenuItem>
        <MenuItem value="2000-5000">2000-5000 Rs</MenuItem>
        <MenuItem value="5000-10000">5000-10000 Rs</MenuItem>
      </Select>
    </FormControl>
    <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
      Apply Filters
    </Button>
    <Button variant="outlined" color="secondary" onClick={clearFilters} fullWidth sx={{ mt: 2 }}>
      Clear Filters
    </Button>
  </Box>
</Drawer>

    </div>
  );
};

export default CourseTable;
