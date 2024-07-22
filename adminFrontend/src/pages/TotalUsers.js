import React, { useState, useEffect } from 'react';
import {
  Table, TableHead, Typography, TableBody, TableCell, TableRow,
  TableContainer, Paper, Box, TablePagination, Avatar, TextField, Button
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Function to generate a hash code from a string
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Function to generate a color based on a hash code
const getColorFromHash = (hash) => {
  const colors = [
    '#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#2196F3',
    '#00BCD4', '#009688', '#4CAF50', '#FFEB3B', '#FF9800'
  ];
  return colors[Math.abs(hash) % colors.length];
};

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
console.log(token)
    fetch('http://localhost:8080/api/v1/auth/users', {
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
        console.log('Fetched data:', data);
        if (data && data.success && Array.isArray(data.users)) {
          // Sort users by createdAt in descending order
          const sortedUsers = data.users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setUsers(sortedUsers);
          setFilteredUsers(sortedUsers); // Set filtered users initially to all users
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = users.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate >= startDate && userDate <= endDate;
      });
      setFilteredUsers(filtered);
      setPage(0); // Reset to first page after filtering
    }
  };

  return (
    <Box sx={{ width: '95%', marginBottom: '5rem', marginTop:'3rem' }}>
      <Typography variant="h4" fontWeight="bold" marginBottom="2rem">All Users</Typography>

      <Box display="flex" alignItems="center" gap={2} marginBottom="2rem">
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
        <Button variant="contained" onClick={handleFilter}>Filter</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, border: 'none' }} size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Sr.no</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{marginBottom:'2rem'}}>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index} >
                <TableCell sx={{ border: 'none' }}>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell sx={{ border: 'none' }}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: getColorFromHash(hashCode(user.email)), marginRight: 2 }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ border: 'none' }}>{user.email}</TableCell>
                <TableCell sx={{ border: 'none' }}>{user.phone}</TableCell>
                <TableCell sx={{ border: 'none' }}>{user.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-caption': {
              fontWeight: 'bold',
            },
            '& .MuiTablePagination-select, & .MuiTablePagination-actions': {
              fontWeight: 'bold',
            }
          }}
          rowsPerPageOptions={[5, 10, 25, 30, 35, 40, 45]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default UserTable;
