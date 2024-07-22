import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, IconButton, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
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
    fetch('http://localhost:8080/api/v1/industry/industrial-workshops', {
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
      <TableContainer sx={{marginTop:'3rem'}}>
        <Table aria-label="Industrial Workshop Table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Current City</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Workshop Type</TableCell>
              <TableCell>Workshop Date</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((workshop, index) => (
              <TableRow key={index}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{workshop.name}</TableCell>
                <TableCell>{workshop.emailId}</TableCell>
                <TableCell>{workshop.phoneNumber}</TableCell>
                <TableCell>{workshop.currentCity}</TableCell>
                <TableCell>{workshop.organization}</TableCell>
                <TableCell>{workshop.designation}</TableCell>
                <TableCell>{workshop.workshopType}</TableCell>
                <TableCell>{workshop.workshopDate}</TableCell> {/* Display formatted date */}
                <TableCell>{workshop.comments}</TableCell>
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
      </TableContainer>
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
    </Paper>
  );
};

export default IndustrialWorkshopTable;
