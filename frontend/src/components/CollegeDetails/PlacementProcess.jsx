import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlacementTable = () => {
  const { _id } = useParams();

  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only fetch if _id is valid
    if (!_id) {
      setError('Invalid College ID');
      setLoading(false);
      return;
    }

    const fetchPlacements = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/college/placements/${_id}`);
        setPlacements(response.data);
      } catch (err) {
        setError('Error fetching placement data');
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [_id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ color: 'red', textAlign: 'center' }}>
        <Typography variant="h6">{error}</Typography>
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
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Placements
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
            <TableCell fontWeight="bold">Package Type</TableCell>
            <TableCell fontWeight="bold">Package Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {placements.map((placement, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell fontWeight="bold">Highest Package</TableCell>
                <TableCell>{placement.highestPackage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell fontWeight="bold">Average Package</TableCell>
                <TableCell>{placement.averagePackage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell fontWeight="bold">Total Recruiters</TableCell>
                <TableCell>{placement.totalRecruiters}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell fontWeight="bold">Total Offers</TableCell>
                <TableCell>{placement.totalOffers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell fontWeight="bold">Average Packages Last 2 Years</TableCell>
                <TableCell>{placement.averagePackagesLastTwoYears.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell fontWeight="bold">Top Recruiting Companies</TableCell>
                <TableCell>{placement.topRecruitingCompanies.join(', ')}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PlacementTable;
