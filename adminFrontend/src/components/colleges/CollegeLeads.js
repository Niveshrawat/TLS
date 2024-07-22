import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TablePagination, Typography, Avatar, TextField, Box, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const handleEdit = (id) => {
  console.log(`Edit item with id: ${id}`);
};

const handleDelete = (id) => {
  console.log(`Delete item with id: ${id}`);
};

// Function to generate a color based on the first letter of the name
const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const TableComponent = () => {
  const [collegeLeads, setCollegeLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Fetch data from backend
    fetch('http://localhost:8080/api/v1/ug/undergraduates', {
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
      .then(data => {
        // Sort data from latest to oldest
        const sortedData = data.reverse();
        setCollegeLeads(sortedData);
        setFilteredLeads(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchQuery, startDate, endDate, collegeLeads]);

  const filterLeads = () => {
    let filteredData = collegeLeads;

    if (searchQuery) {
      filteredData = filteredData.filter((lead) =>
        (lead.name && lead.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lead.location && lead.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lead.courseName && lead.courseName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter((lead) => {
        const leadDate = new Date(lead.date); // Adjust according to your date field
        return leadDate >= startDate && leadDate <= endDate;
      });
    }

    setFilteredLeads(filteredData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Paper>
      <Typography variant='h4'>College Leads</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '2rem'}}>
        <TextField
          variant="outlined"
          placeholder="Search by name, location, or course"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '50%',
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <TableContainer sx={{ width: '85%', marginLeft: '3rem', marginTop: '2rem' }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>College Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>12th Percentage</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Course Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((collegeLead, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 'none' }}>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell sx={{ border: 'none', display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ marginRight: '0.5rem', bgcolor: stringToColor(collegeLead.name) }}>
                    {collegeLead.name && collegeLead.name.charAt(0)}
                  </Avatar>
                  {collegeLead.name}
                </TableCell>
                <TableCell>{collegeLead.phoneNumber}</TableCell>
                <TableCell>{collegeLead.emailId}</TableCell>
                <TableCell>{collegeLead.collegeName}</TableCell>
                <TableCell>{collegeLead.twelfthPercentage}</TableCell>
                <TableCell>{collegeLead.location}</TableCell>
                <TableCell>{collegeLead.courseName}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(collegeLead.srNo)} sx={{ color: 'blue' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(collegeLead.srNo)} sx={{ color: 'red' }}>
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
        count={filteredLeads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
