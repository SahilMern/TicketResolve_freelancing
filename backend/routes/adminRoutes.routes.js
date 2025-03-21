const express = require('express');
const { 
  getAllTickets, 
  getTicketById, 
  closeTicket, 
  addNoteToTicket 
} = require('../controllers/adminController');

const { protect, protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/tickets', protect, protectAdmin, getAllTickets);
router.get('/tickets/:id', protect, protectAdmin, getTicketById);
router.put('/tickets/:id/close', protect, protectAdmin, closeTicket);
router.post('/tickets/:id/notes', protect, protectAdmin, addNoteToTicket);

module.exports = router;
