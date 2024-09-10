import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete,  Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyPostings = () => {
  const [postings, setPostings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api.thelearnskills.com/api/v1/job-postings/my-postings', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched postings:', response.data);

        if (response.data.jobPostings && Array.isArray(response.data.jobPostings)) {
          setPostings(response.data.jobPostings);
        } else {
          console.error('Data received does not have jobPostings array:', response.data);
          setError('Data format error.');
        }
      } catch (err) {
        console.error('Failed to fetch job postings', err);
        setError('Failed to fetch job postings');
      }
    };
    fetchPostings();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-job-posting/${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log(`Delete job posting with id: ${id}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{backgroundColor: '' }}>
    <Box sx={{ maxWidth: 1300, mx:'3rem', mt: 4}}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>My Job Postings</Typography>
      <TableContainer component={Paper} sx={{p:10, borderRadius:5}}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#EDE4FF', height:'5rem', borderBottom:'none' }}>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Company Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Application Last Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postings.length > 0 ? (
              postings.map((posting) => (
                <TableRow key={posting._id} sx={{height: '5rem'}}>
                  <TableCell sx={{ padding: '12px 16px' }}>
                    <Typography variant="h6" fontWeight="bold">{posting.title}</Typography>
                    <Typography variant="body1" color="textSecondary">{posting.location}</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '12px 16px' }}>
                    <Typography 
                      sx={{ 
                        color: 'blue', 
                        cursor: 'pointer', 
                        '&:hover': { textDecoration: 'underline' } 
                      }}
                      onClick={() => navigate(`/job/${jobId}`)}
                    >
                      {posting.companyName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '12px 16px' }}>
                    {new Date(posting.applicationLastDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ padding: '12px 16px' }}>
  <Tooltip title="View">
    <IconButton onClick={() => navigate(`/job/${posting._id}`)} color="info">
      <Visibility />
    </IconButton>
  </Tooltip>
  <Tooltip title="Edit">
    <IconButton onClick={() => handleEdit(posting._id)} color="primary">
      <Edit />
    </IconButton>
  </Tooltip>
  <Tooltip title="Delete">
    <IconButton onClick={() => handleDelete(posting._id)} color="error">
      <Delete />
    </IconButton>
  </Tooltip>
</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ padding: '12px 16px' }}>
                  <Typography>No job postings available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>
  );
};

export default MyPostings;
