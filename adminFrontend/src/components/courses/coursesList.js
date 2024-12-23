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
    highlights: [''], // Initial array with one highlight
    criteria: '',
    price: '',
    duration: '',
    rating: '',
    images: '', // To store uploaded images
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
        if (!response.ok){
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataPayload = new FormData();
    const token = localStorage.getItem('token');

  // Add existing images (URLs)
  formDataPayload.append("existingImages", JSON.stringify(formData.existingImages));
  if (formData.image) {
    formDataPayload.append("image", formData.image); // Only one image
  }


  // Add other fields
  formDataPayload.append("courseName", formData.courseName);
  formDataPayload.append("description", formData.description);
  formDataPayload.append("highlights", JSON.stringify(formData.highlights));
  formDataPayload.append("criteria", JSON.stringify(formData.criteria));
  formDataPayload.append("admissionCriteria", JSON.stringify(formData.admissionCriteria));
  formDataPayload.append("price", formData.price);
  formDataPayload.append("duration", formData.duration);
  formDataPayload.append("rating", formData.rating);
  formDataPayload.append("images",formData.images)

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
      body: formDataPayload
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
    const baseUrl = "https://api.thelearnskills.com/upload";
  
    setFormData({
      courseName: course.courseName || '',
      description: course.description || '',
      existingImages: course.image 
      ? [`${baseUrl}/${course.image}`] 
      : [], // Wrap the single image in an array for compatibility with previews
      highlights: course.highlights || [''], // Ensure highlights is at least an empty array
      criteria: course.criteria || [],
      admissionCriteria: course.admissionCriteria || [],
      price: course.price || '',
      duration: course.duration || '',
      rating: course.rating || '',
      images: course.image || '', // Ensure single image fallback
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
      setFilteredCourses(prevCourses => prevCourses.filter(course => course._id !== id));
    })
    .catch(error => console.error('Error deleting data:', error));
  };

  const handleCreateCourse = () => {
    setFormData({
      courseName: '',
    description: '',
    highlights: [''], // Initial array with one highlight
criteria: [""],
    admissionCriteria: [""],
    price: '',
    duration: '',
    rating: '',
    images: '', // To store uploaded images
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

  const handleHighlightChange = (e, index) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = e.target.value;
    setFormData({
      ...formData,
      highlights: newHighlights,
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, ''], // Add an empty string for new highlight
    });
  };

  const removeHighlight = (index) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      highlights: newHighlights,
    });
  };

  const handleCriteriaChange = (e, index) => {
    const newCriteria = [...formData.criteria];
    newCriteria[index] = e.target.value; // Update the value for the specific index
    setFormData({
      ...formData,
      criteria: newCriteria, // Set the updated criteria array in the state
    });
  };

  const addCriteria = () => {
    setFormData({
      ...formData,
      criteria: [...formData.criteria, ""], // Add a new empty string to criteria array
    });
  };

  const removeCriteria = (index) => {
    const newCriteria = formData.criteria.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      criteria: newCriteria, // Remove the specified index
    });
  };

  const handleChangeAdmissionCriteria = (e, index) => {
    const newCriteria = [...formData.admissionCriteria];
    newCriteria[index] = e.target.value;
    setFormData((prevState) => ({
        ...prevState,
        admissionCriteria: newCriteria,
    }));
};

const addAdmissionCriteria = () => {
    setFormData((prevState) => ({
        ...prevState,
        admissionCriteria: [...(prevState.admissionCriteria || []), ""], // Ensure it's an array
    }));
};

const removeAdmissionCriteria = (index) => {
    setFormData((prevState) => ({
        ...prevState,
        admissionCriteria: prevState.admissionCriteria.filter(
            (_, i) => i !== index
        ),
    }));
};

const handleImageChange = (event) => {
  const file = event.target.files[0]; // Get the first selected file
  setFormData((prevFormData) => ({
    ...prevFormData,
    image: file, // Store a single file
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

  const removeExistingImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.existingImages];
      updatedImages.splice(index, 1);
      return { ...prev, existingImages: updatedImages };
    });
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
            <TableRow style={{ backgroundColor: '#F5F7F8' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>SR. NO</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>COURSE NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>DESCRIPTION</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>IMAGE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>HIGHLIGHTS</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>CRITERIA</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>ADDMISSION CRITERIA</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>PRICE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>DURATION</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>RATING</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
              <TableRow key={course._id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.description}</TableCell>
             
 <TableCell>
 
      <img
        src={`https://api.thelearnskills.com/${course.image}`}
        alt={course.courseName}
        width="50"
      />
    
</TableCell>



<TableCell>
  <ul>
    {(course.highlights || []).length > 0 ? (
      (course.highlights || []).map((highlight, i) => (
        <li key={i}>{highlight}</li>
      ))
    ) : (
      <li>No highlights available</li>
    )}
  </ul>
</TableCell>

               
                <TableCell>
                  {course.criteria && course.criteria.length > 0 ? (
  course.criteria.map((criterion, index) => (
    <div key={index}>{criterion}</div>
  ))
) : (
  <div>No criteria available</div>
)}


      </TableCell>

                  <TableCell>
                    <ul>
                      {course.admissionCriteria &&
                      course.admissionCriteria.length > 0 ? (
                        course.admissionCriteria.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))
                      ) : (
                        <li>No admission criteria available</li>
                      )}
                    </ul>
                  </TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.rating}</TableCell>
                <TableCell>
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

      {/* Drawer for Filters */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={toggleFilterDrawer(false)}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6">Filter Courses</Typography>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <TextField
              label="Course Name"
              value={filterCourseName}
              onChange={handleFilterCourseNameChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Price Range</InputLabel>
            <Select
              value={filterPrice}
              onChange={handleFilterPriceChange}
            >
              <MenuItem value="0-5000">0 - 5000</MenuItem>
              <MenuItem value="5001-10000">5001 - 10000</MenuItem>
              <MenuItem value="10001-20000">10001 - 20000</MenuItem>
              <MenuItem value="20001-50000">20001 - 50000</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={applyFilters}>
              Apply
            </Button>
            <Button variant="outlined" onClick={clearFilters}>
              Clear
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Dialog for Creating/Editing Courses */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? 'Edit Course' : 'Create Course'}</DialogTitle>
        <DialogContent>
        <CourseForm
 formData={formData}
 handleChange={handleChange}
 handleHighlightChange={handleHighlightChange}
 addHighlight={addHighlight}
 removeHighlight={removeHighlight}
 handleCriteriaChange={handleCriteriaChange}
 addCriteria={addCriteria}
 removeCriteria={removeCriteria}
 handleChangeAdmissionCriteria={handleChangeAdmissionCriteria}
 addAdmissionCriteria={addAdmissionCriteria}
 removeAdmissionCriteria={removeAdmissionCriteria}
 handleImageChange={handleImageChange}
 handleSubmit={handleSubmit}
 removeExistingImage={removeExistingImage} // Ensure this is passed
/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEdit ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseTable;