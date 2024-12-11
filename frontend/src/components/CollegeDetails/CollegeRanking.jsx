import React, { useEffect, useState } from 'react';
import { Box, Table, Typography, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CollegeRankingPage = () => {
  const { _id } = useParams(); // Get the college _id from the URL

  const [courseRankings, setCourseRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch rankings from the backend API
    const fetchCourseRankings = async () => {
      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/college/rankingHighlights/${_id}`);
        
        // Log response to inspect the structure
        console.log(response.data, "response");

        // Since the response is an array with an object containing courseRankings
        const rankingsData = response.data[0];  // Access the first object in the array
        
        // Check if courseRankings exists in the response
        if (rankingsData && Array.isArray(rankingsData.courseRankings)) {
          setCourseRankings(rankingsData.courseRankings);
        } else {
          setError('Invalid or missing course rankings data');
        }
      } catch (err) {
        setError('Error fetching rankings');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseRankings();
  }, [_id]); // Dependency array to refetch if _id changes

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ color: 'red', textAlign: 'center' }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  // Display the course rankings
  return (
    <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Ranking
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Course</TableCell>
            <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }} align="right">
              Rank (NIRF 2023)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(courseRankings) && courseRankings.length > 0 ? (
            courseRankings.map((course, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>{course.courseName}</TableCell>
                <TableCell sx={{ border: '1px solid black' }} align="right">
                  #{course.rank}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No rankings available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegeRankingPage;
