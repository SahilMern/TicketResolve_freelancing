const express = require('express');
const {
  getAllTickets,
  getTicketById,
  closeTicket,
  addNoteToTicket,
} = require('../controllers/adminController');
const { protect, protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ GET all tickets (Admin only)
router.get('/tickets', protect, protectAdmin, getAllTickets);

// ✅ GET a specific ticket by ID (Admin only)
router.get('/tickets/:id', protect, protectAdmin, getTicketById);

// ✅ PUT - Close a ticket (Admin only)
router.put('/tickets/:id/close', protect, protectAdmin, closeTicket);

// ✅ POST - Add a note to a ticket (Admin only)
router.post('/tickets/:id/notes', protect, protectAdmin, addNoteToTicket);

module.exports = router;
