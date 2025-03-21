import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleTicket() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleTicketData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tickets/singleTicket/${ticketId}`,
          { withCredentials: true }
        );

        console.log(response.data, "Fetched Ticket Data");

        setTicket(response.data);
        setNotes(response.data.notes || []); // Ensure notes are handled
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch ticket');
      } finally {
        setLoading(false);
      }
    };

    getSingleTicketData();
  }, [ticketId]);

  if (loading) return <p>Loading ticket details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {/* Show Notes Section only if Ticket is NOT Closed */}
      {ticket.status !== 'closed' && (
        <>
          <h2>Notes</h2>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={index} className="note">
                <p>{note.text}</p>
                <small>By: {note.user} on {new Date(note.createdAt).toLocaleString('en-US')}</small>
              </div>
            ))
          ) : (
            <p>No notes added yet.</p>
          )}
        </>
      )}
    </div>
  );
}

export default SingleTicket;
