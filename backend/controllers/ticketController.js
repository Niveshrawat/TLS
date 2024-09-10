import Ticket from '../models/ticketModel.js';

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const ticket = new Ticket({
      user: req.user._id,
      subject,
      description
    });
    await ticket.save();
    res.status(201).send({ success: true, message: 'Ticket created successfully', ticket });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error creating ticket', error });
  }
};

// Get all tickets for an admin
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('user', 'name email');
    res.status(200).send({ success: true, tickets });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error fetching tickets', error });
  }
};

// Get tickets for a specific user
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    res.status(200).send({ success: true, tickets });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error fetching tickets', error });
  }
};

// Update ticket status
export const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId, status } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).send({ success: false, message: 'Ticket not found' });
    }
    ticket.status = status;
    ticket.updatedAt = Date.now();
    await ticket.save();
    res.status(200).send({ success: true, message: 'Ticket status updated successfully', ticket });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error updating ticket status', error });
  }
};
