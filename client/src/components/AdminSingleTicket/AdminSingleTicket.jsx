import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../BackButton';
import Spinner from '../Spinner';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function AdminSingleTicket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.response?.data?.message || 'Failed to fetch ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  // ✅ Function to close a ticket
  const onTicketClose = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/tickets/${ticketId}/close`,
        {},
        { withCredentials: true }
      );
      setTicket((prev) => ({ ...prev, status: 'Closed' }));
      toast.success('Ticket closed successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to close ticket');
    }
  };

  // ✅ Function to open modal
  const openModal = () => setModalIsOpen(true);

  // ✅ Function to close modal
  const closeModal = () => setModalIsOpen(false);

  // ✅ Function to submit a note
  const onNoteSubmit = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return toast.error('Note text is required');

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/admin/tickets/${ticketId}/notes`,
        { text: noteText },
        { withCredentials: true }
      );
      toast.success('Note added successfully');
      closeModal();
      setNoteText('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add note');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="error">{error}</p>;
  if (!ticket) return <p>No ticket found</p>;

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product: {ticket.product?.name || 'N/A'}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'Closed' && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {ticket.status !== 'Closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default AdminSingleTicket;
