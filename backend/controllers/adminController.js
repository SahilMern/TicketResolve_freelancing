const Ticket = require('../models/ticketModel');

// ✅ Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('user', 'name email').exec();
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ Get a single ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('user', 'name email');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Close Ticket with Mandatory Note
const closeTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({ message: 'Closing note is required' });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.status = 'closed';
    ticket.notes.push({ text: `Ticket closed: ${note}` }); // ✅ Note ko ticket ke andar store karein
    ticket.closedAt = new Date();

    await ticket.save();

    res.status(200).json({ message: 'Ticket closed successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// module.exports = { getAllTickets, getTicketById, closeTicket };

// ✅ Add a note to a ticket
const addNoteToTicket = async (req, res) => {
  const note = new Note({ ticket: req.params.id, user: req.user.id, text: req.body.text });
  await note.save();
  await Ticket.findByIdAndUpdate(req.params.id, { $push: { notes: note._id } });

  res.status(201).json({ success: true, note });
};

module.exports = { getAllTickets, getTicketById, closeTicket, addNoteToTicket };
