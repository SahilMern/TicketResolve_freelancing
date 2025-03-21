const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: String,
      required: [true, 'Please enter a product'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      enum: ['Open', 'Resolved', 'Closed'],
      default: 'Open',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    closedAt: {
      type: Date,
    },
    // ✅ Ensure notes are stored as an array of ObjectIds referencing the Note model
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note', // Ensure this matches your Note model name
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
