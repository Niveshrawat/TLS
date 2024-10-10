import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, IconButton, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const IndustrialWorkshopTable = () => {
  const [workshops, setWorkshops] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Fetch data from backend
    fetch('https://api.thelearnskills.com/api/v1/industry/industrial-workshops', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add your token if required
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Format workshopDate to display only the date
        const formattedData = data.map(workshop => ({
          ...workshop,
          workshopDate: new Date(workshop.workshopDate).toLocaleDateString('en-GB') // Adjust locale as needed
        }));

        // Sort data in descending order based on workshopDate
        const sortedData = formattedData.sort((a, b) => new Date(b.workshopDate) - new Date(a.workshopDate));
        setWorkshops(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id) => {
    // Handle edit functionality here
  };

  const handleDelete = (id) => {
    // Handle delete functionality here
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
            <Typography variant="h5" fontWeight="bold">INTERNSHIPS/INDUSTRIAL WORSKSHOPS</Typography>

      <TableContainer sx={{ boxShadow: 3 , marginTop:'2rem'}}>
        <Table aria-label="Industrial Workshop Table" sx={{ minWidth: 650, border: 'none' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F5F7F8' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Email ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Current City</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Organization</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Workshop Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Main Domain</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Workshop Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Comments</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', border: 'none', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((workshop, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontWeight: 'bold', border: 'none' }}>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none',  color: 'blue' }}>{workshop.name}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.emailId}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.phoneNumber}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.currentCity}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.organization}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.designation}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.workshopType}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.type}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.workshopDate}</TableCell> {/* Display formatted date */}
                <TableCell sx={{ textTransform: 'uppercase', border: 'none' }}>{workshop.comments}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(workshop._id)} sx={{ color: 'blue' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(workshop._id)} sx={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <TablePagination
        sx={{
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-caption': {
            fontWeight: 'bold',
          },
          '& .MuiTablePagination-select, & .MuiTablePagination-actions': {
            fontWeight: 'bold',
          }
        }}
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={workshops.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
    </Paper>
  );
};

export default IndustrialWorkshopTable;
