import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Select, MenuItem, Paper } from '@mui/material';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://api.thelearnskills.com/api/v1/job-applications/poster-applications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('API response:', response.data);
      setApplications(Array.isArray(response.data.applications) ? response.data.applications : []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await axios.put('https://api.thelearnskills.com/api/v1/job-applications/update-status', { applicationId, status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1300, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Applications
      </Typography>
      <TableContainer component={Paper} sx={{ p: 5, borderRadius: 5 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#EDE4FF', height: '5rem', borderBottom: 'none' }}>
              <TableCell>Applicant</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Video</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>{application.userId?.name || 'N/A'}</TableCell>
                  <TableCell>{application.jobId?.title || 'N/A'}</TableCell>
                  <TableCell>
                    {application.videoUrl ? (
                      <video width="200" height="100" controls>
                        <source src={`https://api.thelearnskills.com/${application.videoUrl}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      'No video'
                    )}
                  </TableCell>
                  <TableCell>
                    {application.resumeUrl ? (
                      <a href={`https://api.thelearnskills.com/${application.resumeUrl}`} target="_blank" rel="noopener noreferrer">
                        Download Resume
                      </a>
                    ) : (
                      'No resume'
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={application.status}
                      onChange={(e) => updateStatus(application._id, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateStatus(application._id, 'Approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => updateStatus(application._id, 'Rejected')}
                      sx={{ ml: 2 }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Applications;
