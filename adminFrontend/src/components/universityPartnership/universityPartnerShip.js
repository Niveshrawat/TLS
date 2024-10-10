import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  TablePagination,
  Typography
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';





const UniversityPartnershipTable = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://api.thelearnskills.com/api/v1/university/university-partnerships', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkshops(sortedData);
        setFilteredWorkshops(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const results = workshops.filter(workshop =>
      workshop.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWorkshops(results);
  }, [searchTerm, workshops]);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = workshops.filter(workshop =>
        new Date(workshop.date) >= new Date(startDate) && new Date(workshop.date) <= new Date(endDate)
      );
      setFilteredWorkshops(filtered);
    } else {
      setFilteredWorkshops(workshops);
    }
  }, [startDate, endDate, workshops]);

  const handleEdit = (id) => {
    // Handle edit functionality here
  };

  const handleDelete = (id) => {
    // Handle delete functionality here
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    
<div>
<Typography variant="h5" fontWeight="bold">UNIVERSITY PARTNERSHIPS</Typography>

{/* <div className={classes.searchContainer}>
        <SearchIcon />
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
      </div>
      <div className={classes.dateFilterContainer}>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.dateField}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.dateField}
        />
      </div> */}
      <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
      {/* <Button variant="contained" color="primary" style={{ margin: '1rem' }}>
        Create
      </Button> */}
      <Table aria-label="Industrial Workshop Table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F5F7F8' }}>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Sr. No</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>companyName</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Email ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Comments</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Location</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Organization</TableCell>
            
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Designation</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workshops.map((workshop, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontWeight: 'bold', border: 'none' }}>{index + 1}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', border: 'none',  color: 'blue' }}>{workshop.companyName}</TableCell>
              <TableCell>
                  
                  {workshop.name}
                </TableCell>
              <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.emailId}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.phoneNumber}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.comments}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.location}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.organization}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.designation}</TableCell>
              
             

              <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(workshop._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(workshop._id)}>
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
          count={filteredWorkshops.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>
    </div>
    
  );
};

export default UniversityPartnershipTable;
