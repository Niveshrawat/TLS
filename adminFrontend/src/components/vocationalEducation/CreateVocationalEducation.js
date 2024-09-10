import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TablePagination,
  Drawer,
  TextField,
  Box,
  Typography,
  Toolbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const ProgramTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (_id) => {
    navigate(`/vocational-education/${_id}`);
  };

  const handleDelete = async (_id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setRows(rows.filter((row) => row._id !== _id));
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter(row => 
    row.programName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading programs.</p>;

  return (
    <div>
      <Toolbar sx={{marginTop:'4rem'}}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: '20px', marginRight: '10px' }}
          onClick={() => navigate('/create-program')}
        >
          Create Program
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginBottom: '20px' }}
          onClick={() => setDrawerOpen(true)}
        >
          <FilterListIcon />
          Filter
        </Button>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box p={2} width={300}>
          <Typography variant="h6" gutterBottom>Filter Programs</Typography>
          <TextField
            label="Search by Program Name"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearchChange}
          />
        </Box>
      </Drawer>
      <TableContainer component={Paper}>
        <Table aria-label="program table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'gray' }}>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>Sr No</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>Program Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>Duration of Program</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>Program and Class Schedule</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>Edit</TableCell>
              <TableCell style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'1rem' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row._id} style={{ cursor: 'pointer', textTransform: 'uppercase' }}>
                <TableCell style={{ fontWeight: 'bold' }}>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell onClick={() => handleRowClick(row._id)}>{row.programName}</TableCell>
                <TableCell onClick={() => handleRowClick(row._id)}>{row.durationOfProgram}</TableCell>
                <TableCell onClick={() => handleRowClick(row._id)}>{row.programAndClassSchedule}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/edit-program/${row._id}`)} sx={{ color: 'blue' }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDelete(row._id)} sx={{ color: 'red' }}>
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
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </div>
  );
};

export default ProgramTable;
