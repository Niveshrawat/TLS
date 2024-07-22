import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const CoursesTable = ({ courses, overview }) => {
  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: '#fff',
        marginBottom: '2rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Courses
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: '1rem' }}>
        {overview}
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
            <TableCell fontWeight='bold'>Course</TableCell>
            <TableCell fontWeight='bold'>Fees</TableCell>
            <TableCell fontWeight='bold'>Eligibility</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.fees}</TableCell>
              <TableCell>{course.eligibility}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CoursesTable;
