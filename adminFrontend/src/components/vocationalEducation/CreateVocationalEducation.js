// src/ProgramTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProgramTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (_id) => {
    navigate(`/vocational-education/${_id}`);
  };

  const handleDelete = async (_id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education/${_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setRows(rows.filter((row) => row._id !== _id));
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '20px' }}
        onClick={() => navigate('/create-program')}
      >
        Create Program
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="program table">
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell>Program Name</TableCell>
              <TableCell>Duration of Program</TableCell>
              <TableCell>Program and Class Schedule</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row._id} style={{ cursor: 'pointer' }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell onClick={() => handleRowClick(row._id)}>{row.programName}</TableCell>
                <TableCell onClick={() => handleRowClick(row._id)}>{row.durationOfProgram}</TableCell>
                <TableCell onClick={() => handleRowClick(row._id)}>{row.programAndClassSchedule}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/edit-program/${row._id}`)} sx={{color:'blue'}}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDelete(row._id)} sx={{color:'red'}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProgramTable;
