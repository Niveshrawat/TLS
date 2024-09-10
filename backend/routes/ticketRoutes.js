import express from 'express';
import { createTicket, getAllTickets, getUserTickets, updateTicketStatus } from '../controllers/ticketController.js';
import { requireSignIn, isAdmin } from '../middlewares/adminauthMiddleware.js';

const router = express.Router();

router.post('/create-ticket', requireSignIn, createTicket);
router.get('/tickets', requireSignIn, isAdmin, getAllTickets);
router.get('/my-tickets', requireSignIn, getUserTickets);
router.put('/ticket-status', requireSignIn, isAdmin, updateTicketStatus);

export default router;
  