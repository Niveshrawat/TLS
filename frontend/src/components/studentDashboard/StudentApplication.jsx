import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, Typography, Table, TableBody,Paper, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StudentApplication = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://api.thelearnskills.com/api/v1/job-applications/my-applications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('API response:', response.data); // Check the response data
      setApplications(Array.isArray(response.data.applications) ? response.data.applications : []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    }
  };

  const handleViewJob = (job) => {
    navigate(`/job/${job._id}`, { state: { job } });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{mb:4}}>
        Student Applications
      </Typography>
      <Card>
      <TableContainer component={Paper} sx={{ borderRadius:5}}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#EDE4FF', height:'5rem', borderBottom:'none' }}>
              <TableCell sx={{fontWeight:'bold', fontSize:'1rem'}}>Job Title</TableCell>
              <TableCell sx={{fontWeight:'bold', fontSize:'1rem'}}>Company</TableCell>
              <TableCell sx={{fontWeight:'bold', fontSize:'1rem'}}>Status</TableCell>
              <TableCell sx={{fontWeight:'bold', fontSize:'1rem'}} >Video</TableCell>
              <TableCell sx={{fontWeight:'bold', fontSize:'1rem'}} >Resume</TableCell>
              <TableCell sx={{fontWeight:'bold', fontSize:'1rem'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application._id}>
                <TableCell  sx={{fontWeight:'bold', fontSize:'1rem'}}>{application.jobId?.title}</TableCell>
                <TableCell>{application.jobId?.companyName}</TableCell>
                <TableCell sx={{color:'green'}}>{application.status}</TableCell>
                <TableCell>
                  <video width="200" height="100" controls>
                    <source src={`https://api.thelearnskills.com/${application.videoUrl}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
                  <Button onClick={() => handleViewJob(application.jobId)}>View Job</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Card>
    </Box>
  );
};

export default StudentApplication;
