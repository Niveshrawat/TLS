import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const AdmissionProcess = ({ process, ongoing }) => {
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
      <Typography variant="h4" gutterBottom fontWeight='bold'>Admission</Typography>
      <Typography variant="body1" gutterBottom>{process}</Typography>
      <Table
        sx={{
          '& .MuiTableCell-root': {
            border: '1px solid #ddd',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell fontWeight='bold'>Admission Status</TableCell>
           

            <TableCell sx={{color:'green', fontWeight:'bold'}}>{ongoing}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
        <TableCell fontWeight='bold'>Programmes Offered</TableCell>
            <TableCell fontWeight='bold'>52+ Courses with multiple specialization</TableCell>
        </TableRow>
        <TableRow>
        <TableCell fontWeight='bold'>How to Apply </TableCell>
            <TableCell fontWeight='bold'> Click on Apply Now button </TableCell>
        </TableRow>
        <TableRow>
        <TableCell fontWeight='bold'>Levels of Programmes Offered </TableCell>
            <TableCell fontWeight='bold'> Undergraduate , Postgraduate </TableCell>
        </TableRow>
        <TableRow>
        <TableCell fontWeight='bold'>Levels of Programmes Offered </TableCell>
            <TableCell fontWeight='bold'> Undergraduate , Postgraduate </TableCell>
        </TableRow>
        <TableRow>
        <TableCell fontWeight='bold'> Popular Programmes</TableCell>
            <TableCell fontWeight='bold'> B.Tech , BCA, B.Com </TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdmissionProcess;
