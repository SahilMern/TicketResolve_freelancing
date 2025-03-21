const express = require('express');
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  getsingleTicket,
  getSingleTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

// Re-route into note router
// const noteRouter = require('./noteRoutes');
// router.use('/:ticketId/notes', noteRouter);

// Separate routes for GET, POST, PUT, DELETE
router.get('/',protect, getTickets); // Handles GET request for tickets
router.post('/', protect, createTicket); 

router.get('/:id', protect, getTicket);
router.get('/singleTicket/:id', protect, getSingleTicket); // Handles GET request for a single ticket
router.delete('/:id', protect, deleteTicket); // Handles DELETE request for a ticket
router.put('/:id', protect, updateTicket); // Handles PUT request to update a ticket

module.exports = router;
