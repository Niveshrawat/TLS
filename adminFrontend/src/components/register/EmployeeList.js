import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Drawer,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import RegisterPage from './Register'; // Adjust the path if needed

const EmployeeTable = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found in localStorage');
          return;
        }

        const response = await fetch('https://api.thelearnskills.com/api/v1/auth/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log('Fetched data:', data);

        if (response.ok) {
          if (data.success && Array.isArray(data.users)) {
            setEmployees(data.users);
          } else {
            setError('Invalid data format: Expected an array in "users"');
            console.error('Invalid data format:', data);
          }
        } else {
          setError(data.message || 'Failed to fetch employees');
          console.error('Failed to fetch employees:', data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilterOpen = () => setOpenFilterDrawer(true);
  const handleFilterClose = () => setOpenFilterDrawer(false);

  const handleRoleChange = (event) => setRoleFilter(event.target.value);
  const handleDateChange = (event) => setDateFilter({ ...dateFilter, [event.target.name]: event.target.value });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEmployees = employees
    .filter(emp => (roleFilter ? emp.role === roleFilter : true))
    .filter(emp => {
      const empDate = new Date(emp.createdAt);
      const startDate = new Date(dateFilter.startDate);
      const endDate = new Date(dateFilter.endDate);
      return (!dateFilter.startDate || !dateFilter.endDate || (empDate >= startDate && empDate <= endDate));
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleOpenRegisterDialog = () => setOpenRegisterDialog(true);
  const handleCloseRegisterDialog = () => setOpenRegisterDialog(false);

  return (
    <div style={{marginTop:'4rem'}}>
      <Button variant="contained" color="primary" onClick={handleOpenRegisterDialog}>
        Create Employee
      </Button>
      <IconButton onClick={handleFilterOpen}>
        <FilterListIcon />
      </IconButton>
      <Drawer anchor="right" open={openFilterDrawer} onClose={handleFilterClose}>
        <div style={{ width: 250, padding: 20 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} onChange={handleRoleChange}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="teamLeader">Team Leader</MenuItem>
              <MenuItem value="caller">Caller</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Start Date"
            type="date"
            name="startDate"
            InputLabelProps={{ shrink: true }}
            value={dateFilter.startDate}
            onChange={handleDateChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="End Date"
            type="date"
            name="endDate"
            InputLabelProps={{ shrink: true }}
            value={dateFilter.endDate}
            onChange={handleDateChange}
          />
        </div>
      </Drawer>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <TableContainer component={Paper}  sx={{ mt: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow style={{ fontWeight: 'bold', backgroundColor: 'gray' }}>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>SERIAL NO</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>NAME</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>EMAIL</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>PHONE</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>ADDRESS</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>ROLE</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>LEADER</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((emp, index) => (
                <TableRow key={emp._id}>
                  <TableCell style={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
                  <TableCell style={{ textTransform: 'uppercase',  color: 'blue' }}>{emp.name}</TableCell>
                  <TableCell style={{ textTransform: 'uppercase' }}>{emp.email}</TableCell>
                  <TableCell style={{ textTransform: 'uppercase' }}>{emp.phone}</TableCell>
                  <TableCell style={{ textTransform: 'uppercase' }}>{emp.address}</TableCell>
                  <TableCell style={{ textTransform: 'uppercase' }}>{emp.role}</TableCell>
                  <TableCell style={{ textTransform: 'uppercase' }}>{emp.teamLeader ? emp.teamLeader.name : 'None'}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Register Page Dialog */}
      <Dialog
        open={openRegisterDialog}
        onClose={handleCloseRegisterDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create Employee</DialogTitle>
        <DialogContent>
          <RegisterPage handleClose={handleCloseRegisterDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegisterDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeTable;
