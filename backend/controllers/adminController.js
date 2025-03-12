const Ticket = require('../models/ticketModel')

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Fetch all tickets from the database
    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
  const { id } = req.params;
  console.log(id, "ssssss");
  
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


module.exports = {
    getAllTickets,
    getTicketById
  }
  