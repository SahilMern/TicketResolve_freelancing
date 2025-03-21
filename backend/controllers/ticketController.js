const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');

// ✅ Get all tickets
const getTickets = asyncHandler(async (req, res) => {
  console.log("------------");
  
  try {
    const tickets = await Ticket.find({ user: req.user.id });

    if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets found' });
    }
    console.log(tickets, "tickets tickets");
    
    return res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Get a specific ticket
const getTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Get single ticket (alternative route)
const getSingleTicket = asyncHandler(async (req, res) => {
  console.log('Fetching single ticket...');

  try {
    const { id } = req.params;
    console.log(id, "id");
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(id).populate('notes'); // Include notes

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (!req.user || ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// ✅ Create new ticket
const createTicket = asyncHandler(async (req, res) => {
  console.log("Creating new ticket...");

  try {
    const { product, description, engineer } = req.body;

    if (!product || !description || !engineer) {
      return res.status(400).json({ message: 'Please provide product, description, and engineer' });
    }

    const newTicket = new Ticket({
      product,
      description,
      engineer,
      user: req.user.id,
      status: 'new',
    });

    const ticket = await newTicket.save();
    return res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Delete ticket
const deleteTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    await ticket.deleteOne();

    return res.status(200).json({ message: 'Ticket deleted successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Update ticket
const updateTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json(updatedTicket);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = {
  getTickets,
  getTicket,
  getSingleTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
