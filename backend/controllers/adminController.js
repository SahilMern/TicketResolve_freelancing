const Ticket = require('../models/ticketModel')

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    // Fetch all tickets and populate relevant fields (user and product/project)
    const tickets = await Ticket.find()
      .populate('user', 'name email')  // Populate user with name and email
      .populate('product', 'name')     // Populate product/project name, assuming `product` is a reference to a Project model
      .exec();

    // Calculate summary values
    const total = tickets.length;
    const open = tickets.filter(ticket => ticket.status === 'Open').length;
    const resolved = tickets.filter(ticket => ticket.status === 'Resolved').length;

    // Respond with the tickets and summary
    res.status(200).json({
      success: true,
      data: {
        tickets,
        total,
        open,
        resolved,
      },
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
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
  