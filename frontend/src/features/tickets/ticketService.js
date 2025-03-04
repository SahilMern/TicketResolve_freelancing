import axios from 'axios'

const API_URL = 'http://localhost:5000/api/tickets/'

// Create new ticket
// const createTicket = async (ticketData) => {
//   const token = localStorage.getItem("token");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",

//     },
//   }

//   const response = await axios.post(API_URL, ticketData, config)

//   return response.data
// }

const createTicket = async (ticketData, token) => {
  if (!token) {
      console.error("No token found! User not authorized.");
      return { error: "No token found" };
  }

  const config = {
      headers: {
          Authorization: `Bearer ${token}`,  // ✅ सही से टोकन पास करें
          "Content-Type": "application/json",
      },
  };

  try {
      const response = await axios.post(API_URL, ticketData, config);
      return response.data;
  } catch (error) {
      console.error("Error creating ticket:", error.response?.data || error.message);
      return error.response?.data || { error: "Error creating ticket" };
  }
};


// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
  },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

// Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )

  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
}

export default ticketService
