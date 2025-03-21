import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Dashboard.css'; 

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketSummary, setTicketSummary] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/tickets', {
          withCredentials: true,
        });
console.log(response, "response response response");

        if (response.data.success) {
          setTickets(response.data.tickets);
          setTicketSummary({
            total: response.data.total,
            open: response.data.open,
            resolved: response.data.resolved,
          });
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const viewTicket = (ticketId) => {
    navigate(`/dashboard/${ticketId}`);
  };

  return (
    <div className="container">
      {/* Card Layout */}
      <div className="card-layout">
        <div className="card">
          <div className="card-body">
            <div className="card-title h5 text-center">Total Tickets</div>
            <h3 className="text-center">{ticketSummary.total}</h3>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-title h5 text-center">Open Tickets</div>
            <h3 className="text-center">{ticketSummary.open}</h3>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-title h5 text-center">Resolved Tickets</div>
            <h3 className="text-center">{ticketSummary.resolved}</h3>
          </div>
        </div>
      </div>

      <hr />

      {/* Ticket Table */}
      <div className="table-container">
        <h3 className="heading">All Tickets</h3>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>User Email</th>
              <th>User Name</th>
              <th>Project Name</th>
              <th>Issue Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No tickets to show
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.user?.email || 'N/A'}</td>
                  <td>{ticket.user?.name || 'N/A'}</td>
                  <td>{ticket.product?.name || 'N/A'}</td>
                  <td>{ticket.issueTitle}</td>
                  <td>{ticket.description}</td>
                  <td className={ticket.status.toLowerCase()}>{ticket.status}</td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => viewTicket(ticket._id)} className="btn btn-primary">
                      View
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-secondary">Assign</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
