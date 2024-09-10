import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [status, setStatus] = useState('');
  const [editingTicket, setEditingTicket] = useState(null);
  const [open, setOpen] = useState(false);



  useEffect(() => {
    axios.get('https://api.thelearnskills.com/api/v1/tickets/tickets', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        setTickets(response.data.tickets);
      })
      .catch(error => {
        console.error("There was an error fetching the tickets!", error);
      });
  }, []);

  const handleStatusChange = (ticketId, newStatus) => {
    axios.put('https://api.thelearnskills.com/api/v1/tickets/ticket-status', {
      ticketId: ticketId,
      status: newStatus
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        const updatedTicket = response.data.ticket;
        setTickets(tickets.map(ticket => ticket._id === updatedTicket._id ? updatedTicket : ticket));
        setEditingTicketId(null); // Close the select dropdown after update
      })
      .catch(error => {
        console.error("There was an error updating the ticket status!", error);
      });
  };
  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setStatus(ticket.status);
    setOpen(true);
  };

  const handleDelete = (ticketId) => {
    
  };


  const getStatusStyle = (status) => {
    switch (status) {
      case 'open':
        return { color: 'green' };
      case 'in progress':
        return { color: 'goldenrod' };
      case 'closed':
        return { color: 'red' };
      default:
        return {};
    }
  };

  return (
    <div style={{backgroundColor:'#EEEDEB'}}>
    <TableContainer component={Paper} sx={{ mt: 10, boxShadow: 3,  }} >
      <Table aria-label="ticket table"marginTop="10rem">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'gray' }}>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Sr. No</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Email ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Subject</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', padding: '8px', textTransform: 'uppercase' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={ticket._id}>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', padding: '8px' }} >{index + 1}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', padding: '8px',  color: 'blue' }}>{ticket.user.name}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{ticket.user.email}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{ticket.subject}</TableCell>
              <TableCell sx={{ textTransform: 'uppercase', padding: '8px' }}>{ticket.description}</TableCell>
              <TableCell sx={getStatusStyle(ticket.status)}>
                {editingTicketId === ticket._id ? (
                  <Select
                    value={status}
                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                    onBlur={() => setEditingTicketId(null)} // Close the dropdown if focus is lost
                  >
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="in progress">In Progress</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                ) : (
                  <div onClick={() => {
                    setEditingTicketId(ticket._id);
                    setStatus(ticket.status);
                  }}>
                    {ticket.status}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(ticket)}><EditIcon color="primary" /></IconButton>
                <IconButton onClick={() => handleDelete(ticket._id)}><DeleteIcon color="error" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default TicketTable;
