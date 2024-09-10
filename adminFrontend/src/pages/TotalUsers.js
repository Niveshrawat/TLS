import React, { useState, useEffect } from 'react';
import {
  Table, TableHead, Typography, TableBody, TableCell, TableRow,
  TableContainer, Paper, Box, TablePagination, Avatar, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

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
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for bulk deletion

  const navigate = useNavigate();

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    fetch('https://api.thelearnskills.com/api/v1/auth/users', {
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

  // Function to delete a single user
  const handleDeleteUser = (userId) => {
    const token = localStorage.getItem('token');
    fetch(`https://api.thelearnskills.com/api/v1/auth/user/${userId}`, {
      method: 'DELETE',
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
        if (data.success) {
          setUsers(users.filter(user => user._id !== userId));
          setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
        } else {
          console.error('Failed to delete user:', data);
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  // Function to delete all users
  const handleDeleteAllUsers = () => {
    const token = localStorage.getItem('token');
    fetch('https://api.thelearnskills.com/api/v1/auth/users', {
      method: 'DELETE',
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
        if (data.success) {
          setUsers([]);
          setFilteredUsers([]);
          setOpenDialog(false); // Close the dialog
        } else {
          console.error('Failed to delete all users:', data);
        }
      })
      .catch(error => console.error('Error deleting all users:', error));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        <Button variant="contained" color="secondary" onClick={handleOpenDialog}>Delete All Users</Button>
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
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{marginBottom:'2rem'}}>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index} onClick={() => handleRowClick(user._id)}>
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
                <TableCell sx={{ border: 'none' }}>
                  <ButtonGroup>
                    <Button onClick={(e) => { e.stopPropagation(); handleDeleteUser(user._id); }} color="error">
                      <Typography color="error" fontWeight="bold">Delete</Typography>
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Dialog for confirming bulk deletion */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all users? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteAllUsers} color="secondary">Delete All</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
