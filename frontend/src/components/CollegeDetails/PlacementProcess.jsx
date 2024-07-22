import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const PlacementTable = ({ placements }) => {
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
      <Typography variant="h4" gutterBottom fontWeight='bold'>Placements</Typography>
      <Table
        sx={{
          '& .MuiTableCell-root': {
            border: '1px solid #ddd',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell fontWeight='bold'>Company Name</TableCell>
            <TableCell fontWeight='bold'>Package</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {placements.map((placement, index) => (
            <TableRow key={index}>
              <TableCell>{placement.company}</TableCell>
              <TableCell>{placement.package}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PlacementTable;
