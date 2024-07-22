import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Avatar,
  TablePagination,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';





const IndustrialWorkshopTable = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/v1/university/university-partnerships', {
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
    <>

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
    <TableContainer component={Paper}>
      {/* <Button variant="contained" color="primary" style={{ margin: '1rem' }}>
        Create
      </Button> */}
      <Table aria-label="Industrial Workshop Table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No</TableCell>
            <TableCell>companyName</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email ID</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Comme</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Designation</TableCell>
            
            <TableCell>Comments</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workshops.map((workshop, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{workshop.companyName}</TableCell>
              <TableCell>
                  <Avatar style={{ backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>
                    {workshop.name[0]}
                  </Avatar>
                  {workshop.name}
                </TableCell>
              <TableCell>{workshop.emailId}</TableCell>
              <TableCell>{workshop.phoneNumber}</TableCell>
              <TableCell>{workshop.comments}</TableCell>
              <TableCell>{workshop.location}</TableCell>
              <TableCell>{workshop.organization}</TableCell>
              <TableCell>{workshop.designation}</TableCell>
             

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
    </>
  );
};

export default IndustrialWorkshopTable;
