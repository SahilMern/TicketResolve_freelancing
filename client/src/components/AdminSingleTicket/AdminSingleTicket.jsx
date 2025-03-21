import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import BackButton from '../BackButton';
import Spinner from '../Spinner';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function AdminSingleTicket() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [closeModalIsOpen, setCloseModalIsOpen] = useState(false);
  const [closeNote, setCloseNote] = useState('');

  const { ticketId } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/admin/tickets/${ticketId}`,
          { withCredentials: true }
        );
        setTicket(data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const onTicketClose = async () => {
    if (!closeNote.trim()) return toast.error('Closing note is required');

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/admin/tickets/${ticketId}/close`,
        { note: closeNote },
        { withCredentials: true }
      );

      setTicket((prev) => ({
        ...prev,
        status: 'Closed',
        notes: [...prev.notes, { text: `Ticket closed: ${closeNote}` }],
      }));

      toast.success('Ticket closed successfully');
      setCloseModalIsOpen(false);
      setCloseNote('');
    } catch {
      toast.error('Failed to close ticket');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className='error'>{error}</p>;

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      <div className='notes-section'>
        {(!ticket.notes || ticket.notes.length === 0) ? (
          <p>No notes added yet.</p>
        ) : (
          ticket.notes.map((note, index) => (
            <div key={index} className='note'>
              <strong>Note {index + 1}:</strong> {note.text}
            </div>
          ))
        )}
      </div>

      {ticket.status !== 'Closed' && (
        <button onClick={() => setCloseModalIsOpen(true)} className='btn btn-danger'>
          Close Ticket
        </button>
      )}

      <Modal
        isOpen={closeModalIsOpen}
        onRequestClose={() => setCloseModalIsOpen(false)}
        style={customStyles}
        contentLabel='Close Ticket'
      >
        <h2>Close Ticket</h2>
        <button className='btn-close' onClick={() => setCloseModalIsOpen(false)}>X</button>
        <form onSubmit={(e) => { e.preventDefault(); onTicketClose(); }}>
          <div className='form-group'>
            <textarea
              className='form-control'
              placeholder='Closing note is required'
              value={closeNote}
              onChange={(e) => setCloseNote(e.target.value)}
            ></textarea>
          </div>
          <button className='btn btn-danger' type='submit'>
            Close Ticket
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AdminSingleTicket;
