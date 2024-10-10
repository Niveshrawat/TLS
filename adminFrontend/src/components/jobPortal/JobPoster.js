import React, { useState, useEffect } from 'react';
import { Table, TableBody, Typography, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Select, FormControl } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const statusColors = {
  pending: 'gold',
  approved: 'green',
  rejected: 'red'
};

const JobPoster = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchJobPosters();
  }, []);

  const fetchJobPosters = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.get('https://api.thelearnskills.com/api/v1/auth/job/all-job-posters', {
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      await axios.put(`https://api.thelearnskills.com/api/v1/auth/job/approve-job-poster/${id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      setData(prevData => 
        prevData.map(item => 
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      await axios.delete(`https://api.thelearnskills.com/api/v1/auth/job/delete-job-poster/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      setData(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting job poster:', error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 10, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F5F7F8' }}>
            {['Sr. No', 'NAME', 'COMPANY NAME', 'INDUSTRY TYPE', 'DESIGNATION', 'OFFICIAL EMAIL ID', 'MOBILE NUMBER', 'STATUS', 'ACTIONS'].map(header => (
              <TableCell key={header} style={{ fontWeight: 'bold', fontSize: '1rem' }}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row._id}>
              <TableCell style={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
              <TableCell sx={{ color: 'blue'}}>{row.name}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.industryType}</TableCell>
              <TableCell>{row.designation}</TableCell>
              <TableCell>{row.officialEmailId}</TableCell>
              <TableCell>{row.mobileNumber}</TableCell>
              <TableCell>
  {row.status.toLowerCase() !== 'pending' ? (
    // If status is updated (not "pending"), show it as text
    <Typography style={{ color: statusColors[row.status.toUpperCase()] }}>
      {row.status}
    </Typography>
  ) : (
    // If status is still "pending", show the form control to allow status selection
    <FormControl>
      <Select
        value={row.status} // Ensure the value matches exactly
        onChange={(e) => handleStatusChange(row._id, e.target.value)}
        style={{ color: statusColors[row.status.toUpperCase()] }}
      >
        <MenuItem value="approved" style={{ color: 'green' }}>APPROVED</MenuItem>
        <MenuItem value="pending" style={{ color: 'yellow' }}>PENDING</MenuItem>
        <MenuItem value="rejected" style={{ color: 'red' }}>REJECTED</MenuItem>
      </Select>
    </FormControl>
  )}
</TableCell>



              <TableCell>
                <IconButton aria-label="edit" style={{ color: 'blue' }}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(row._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobPoster;
