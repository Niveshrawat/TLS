import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LongCourseTable = () => {
  const [courseLeads, setCourseLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Fetch data from backend
    fetch('http://localhost:8080/api/v1/lc/long-term-certificates', {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <Typography variant='h5' fontWeight="bold">Long Term Leads</Typography>
      <TableContainer sx={{marginTop:'4rem'}}>
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
            {courseLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((courseLead, index) => (
              <TableRow key={courseLead.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
      <TablePagination
      sx={{
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-caption': {
          fontWeight: 'bold',
        },
        '& .MuiTablePagination-select, & .MuiTablePagination-actions': {
          fontWeight: 'bold',
        }
      }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={courseLeads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LongCourseTable;
