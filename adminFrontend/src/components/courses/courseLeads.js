import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Select, MenuItem, TablePagination,
  Button, Modal, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLeadForm from './LeadForm';

const CourseTable = () => {
  const [courseLeads, setCourseLeads] = useState([]);
  const [callers, setCallers] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [statusColors] = useState({
    Enquiry: 'grey',
    Enc: 'blue',
    Cold: 'lightblue',
    Dead: 'black',
    Connected: 'green',
    Warm: 'orange',
    Hot: 'red',
    Register: 'purple',
    Enroll: 'pink'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token:', token);

    const fetchCallers = async () => {
      try {
        const response = await fetch('https://api.thelearnskills.com/api/v1/sc/callers', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('Received callers data:', data);
        const callerArray = data.callers; // Adjust this line according to the actual structure
        if (Array.isArray(callerArray)) {
          const callerNames = callerArray.map(caller => ({
            _id: caller._id,
            name: caller.name
          }));
          setCallers(callerNames);
        } else {
          console.error('Data is not an array:', callerArray);
        }
      } catch (error) {
        console.error('Error fetching callers:', error);
      }
    };

    const fetchCourseLeads = async () => {
      try {
        const endpoint = role === 'caller'
          ? 'https://api.thelearnskills.com/api/v1/sc/caller-leads'
          : 'https://api.thelearnskills.com/api/v1/sc/short-term-certificates';
        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setCourseLeads(data);
      } catch (error) {
        console.error('Error fetching course leads:', error);
      }
    };

    fetchCallers();
    fetchCourseLeads();
  }, [role]);

  const handleAssign = async (leadId, callerId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://api.thelearnskills.com/api/v1/sc/assign-lead/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ callerId })
      });
      const data = await response.json();
      if (data.message === 'Lead assigned successfully') {
        setCourseLeads(prevLeads => prevLeads.map(lead => lead._id === leadId ? { ...lead, assignedTo: callerId } : lead));
      }
    } catch (error) {
      console.error('Error assigning lead:', error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit course with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setCourseLeads(prevCourses => prevCourses.filter(courseLead => courseLead._id !== id));
    console.log(`Delete course with ID: ${id}`);
  };

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://api.thelearnskills.com/api/v1/sc/update-lead-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.message === 'Status updated successfully') {
        setCourseLeads(prevLeads => prevLeads.map(lead => lead._id === id ? { ...lead, status } : lead));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant="h5" fontWeight="bold" gutterBottom>Short Term Leads</Typography>
      {role === 'admin' && ( // Only show Add Lead button if role is admin
        <Button variant="contained" color="primary" onClick={handleOpen}>Add Lead</Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4
        }}>
          <AddLeadForm handleClose={handleClose} />
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
        <Table aria-label="course table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'gray' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Email ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Course Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Status</TableCell>
              {role === 'teamLeader' && (
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Assigned</TableCell>
              )}
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>UserId</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((courseLead, index) => (
              <TableRow key={courseLead._id}>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', padding: '8px' }}>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', padding: '8px',  color: 'blue' }}>{courseLead.name}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{courseLead.phoneNumber}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{courseLead.emailId}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{courseLead.location}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{courseLead.category}</TableCell>
                <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{courseLead.courseName}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  {role === 'caller' ? (
                    <Select
                      value={courseLead.status || ''}
                      onChange={(e) => handleStatusChange(courseLead._id, e.target.value)}
                      displayEmpty
                      style={{ color: statusColors[courseLead.status] }}
                    >
                      <MenuItem value="" disabled>Select Status</MenuItem>
                      {Object.keys(statusColors).map(status => (
                        <MenuItem key={status} value={status} style={{ color: statusColors[status] }}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Typography style={{ color: statusColors[courseLead.status] }}>
                      {courseLead.status.charAt(0).toUpperCase() + courseLead.status.slice(1)}
                    </Typography>
                  )}
                </TableCell>
                {role === 'teamLeader' && (
                  <TableCell sx={{ padding: '8px' }}>
                    <Select
                      value={courseLead.assignedTo || ''}
                      onChange={(e) => handleAssign(courseLead._id, e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>Select Caller</MenuItem>
                      {callers.map(caller => (
                        <MenuItem key={caller._id} value={caller._id}>
                          {caller.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                )}
                <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{courseLead.userId}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <IconButton aria-label="edit" onClick={() => handleEdit(courseLead._id)} sx={{ color: 'blue' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(courseLead._id)} sx={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={courseLeads.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default CourseTable;
