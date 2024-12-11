import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdmissionProcess = () => {
  const { _id } = useParams(); // Get college ID from route params
  const [admissionData, setAdmissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      console.log("Fetching admission data...");
      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/college/admissions/${_id}`);
        console.log("Admission data fetched:", response.data);
        setAdmissionData(response.data || []); // Default to an empty array if data is undefined
      } catch (err) {
        console.error("Error fetching admission data:", err);
        setError("Failed to load admission data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, [_id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!admissionData.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6">No admission data available.</Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        padding: '2rem', 
        backgroundColor: '#fff', 
        marginBottom: '2rem', 
        border: '1px solid #ccc', 
        borderRadius: '4px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">Admission Details</Typography>
      {admissionData.map((admission, index) => (
        <Box key={admission._id} sx={{ marginBottom: '2rem' }}>
          <Typography variant="body1" gutterBottom>
            {admission.aboutAdmissionProcess || "No admission process details available."}
          </Typography>
          <Table
            sx={{
              '& .MuiTableCell-root': {
                border: '1px solid #ddd',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell><strong>Admission Status</strong></TableCell>
                <TableCell sx={{ color: admission.admissionStatus === 'ongoing' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {admission.admissionStatus || "Not available"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><strong>Programmes Offered</strong></TableCell>
                <TableCell>{admission.programmesOffered?.join(', ') || "Not available"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>How to Apply</strong></TableCell>
                <TableCell>{admission.howToApply || "Not available"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Levels of Programmes Offered</strong></TableCell>
                <TableCell>{admission.levelsOfProgrammesOffered?.join(', ') || "Not available"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Popular Programmes</strong></TableCell>
                <TableCell>{admission.popularProgrammes?.join(', ') || "Not available"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

export default AdmissionProcess;
