import React from 'react';
import { Table,Typography, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const CollegeRankingPage = () => {
  // Example data (replace with actual data)
  const courseRankings = [
    { course: 'Computer Science', rank: 17 },
    { course: 'Electrical Engineering', rank: 23 },
    { course: 'Medicine', rank: 8 },
    // Add more courses as needed
  ];

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
            <Typography variant="h4" gutterBottom fontWeight='bold'>Ranking</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid black', fontWeight:'bold' }}>Course</TableCell>
            <TableCell sx={{ border: '1px solid black',fontWeight:'bold' }} align="right">Rank (NIRF 2023)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseRankings.map((course, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: '1px solid black',fontWeight:'bold' }}>{course.course}</TableCell>
              <TableCell sx={{ border: '1px solid black' }} align="right">#{course.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegeRankingPage;
