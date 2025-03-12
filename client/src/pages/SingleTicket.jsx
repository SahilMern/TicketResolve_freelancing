import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import axios from 'axios'

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
}

Modal.setAppElement('#root')

function SingleTicket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [ticket, setTicket] = useState(null)
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()
  const { ticketId } = useParams()

  useEffect(() => {
    // Fetch ticket and notes data from the API
    const fetchTicketData = async () => {
      try {
        // Fetch the ticket data from the backend
        const ticketResponse = await axios.get(`http://localhost:5000/api/tickets/${ticketId}`, {
          withCredentials: true, // Ensure cookies are sent with the request
        })
        if (ticketResponse.data.success) {
          setTicket(ticketResponse.data.data)
        }

        // Fetch notes related to the ticket from the backend
        const notesResponse = await axios.get(`http://localhost:5000/api/tickets/${ticketId}/notes`, {
          withCredentials: true, // Ensure cookies are sent with the request
        })
        if (notesResponse.data.success) {
          setNotes(notesResponse.data.notes)
        }
      } catch (error) {
        console.error('Error fetching ticket or notes:', error)
      }
    }

    fetchTicketData()
  }, [ticketId])

  const onTicketClose = async () => {
    try {
      // Close the ticket via API
      const response = await axios.put(`http://localhost:5000/api/tickets/${ticketId}/close`, {}, {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      if (response.data.success) {
        alert('Ticket Closed')
        navigate('/tickets')
      }
    } catch (error) {
      console.error('Error closing the ticket:', error)
    }
  }

  const onNoteSubmit = async (e) => {
    e.preventDefault()
    try {
      // Submit the new note via API
      const response = await axios.post(`http://localhost:5000/api/tickets/${ticketId}/notes`, {
        text: noteText,
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      if (response.data.success) {
        setNotes([...notes, response.data.note])
        setNoteText('')
        closeModal()
      }
    } catch (error) {
      console.error('Error submitting note:', error)
    }
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (!ticket) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default SingleTicket
