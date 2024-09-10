import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, TextField
} from '@mui/material';

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch user tickets from backend on component mount
    axios.get('https://api.thelearnskills.com/api/v1/tickets/my-tickets', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the token in localStorage
      }
    })
      .then(response => {
        setTickets(response.data.tickets); // Assuming the response has a 'tickets' array
      })
      .catch(error => {
        console.error("There was an error fetching the tickets!", error);
      });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSubject('');
    setDescription('');
  };

  const handleSubmit = () => {
    // Send ticket data to backend
    axios.post('https://api.thelearnskills.com/api/v1/tickets/create-ticket', {
      subject,
      description
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        const newTicket = response.data.ticket; // Assuming the new ticket is returned in response
        setTickets([...tickets, newTicket]);
        handleClose();
      })
      .catch(error => {
        console.error("There was an error creating the ticket!", error);
      });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>Ticket Management</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '16px' }}>Raise Ticket</Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4
        }}>
          <Typography variant="h6" gutterBottom>Raise a Ticket</Typography>
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>Submit</Button>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table aria-label="ticket table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase' }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket, index) => (
              <TableRow key={ticket.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Ticket;
