import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import TicketItem from '../../components/TicketItem';

function MyTickets() {
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // ✅ Fixed misspelling
        });

        console.log(response.data, "Fetched Tickets");

        if (!response.data || !Array.isArray(response.data.tickets)) {
          throw new Error('Invalid data format received');
        }

        setTickets(response.data.tickets);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []); // Runs once when component mounts

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <BackButton />
      <h3>Tickets</h3>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.length > 0 ? (
          tickets.map((ticket) => <TicketItem key={ticket._id} ticket={ticket} />)
        ) : (
          <p>No tickets found</p>
        )}
      </div>
    </>
  );
}

export default MyTickets;
