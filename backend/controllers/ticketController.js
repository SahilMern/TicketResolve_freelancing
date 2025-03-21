const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const mongoose = require("mongoose")
const getTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id })
    console.log('HYEYEYEYEY')

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found' })
    }

    return res.status(200).json({ tickets }) // Return the tickets in the response
  } catch (error) {
    console.error(error) // Log the error for debugging
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
})

const getTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' })
    }

    return res.status(200).json(ticket)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
})

const getSingleTicket = async (req, res) => {
  console.log('Fetching single ticket...')

  try {
    const { id } = req.params

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' })
    }

    const ticket = await Ticket.findById(id)

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    if (!req.user || ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' })
    }

    return res.status(200).json(ticket)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  try {
    const { product, description, engineer } = req.body

    console.log('Received ticket data:', product, description, engineer)

    // Validation
    if (!product || !description || !engineer) {
      return res
        .status(400)
        .json({ message: 'Please add a product, description, and engineer' })
    }

    const newTicket = new Ticket({
      product,
      description,
      engineer, // Add engineer here
      user: req.user.id, // Assuming req.user is set correctly in the protect middleware
      status: 'new',
    })

    const ticket = await newTicket.save()

    return res.status(201).json(ticket) // Return the created ticket
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
})

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' })
    }

    await ticket.remove()

    return res
      .status(200)
      .json({ message: 'Ticket deleted successfully', success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' })
    }

    // Validate body data (you can add specific validations as needed)
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    return res.status(200).json(updatedTicket)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
})

module.exports = {
  getTickets,
  getTicket,
  getSingleTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
