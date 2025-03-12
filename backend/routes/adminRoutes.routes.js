const express = require('express');
const { getTicketById, getAllTickets } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware'); // Import the protectAdmin middleware

const router = express.Router();

// Route to get all tickets - Admin only
router.get('/tickets', protectAdmin, getAllTickets);

// Route to get a specific ticket by ID - Admin only
router.get('/tickets/:id', protectAdmin, getTicketById);

module.exports = router;
