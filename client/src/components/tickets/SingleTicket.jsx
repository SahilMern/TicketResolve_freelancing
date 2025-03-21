// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import Modal from 'react-modal'
// import { FaPlus } from 'react-icons/fa'
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// // import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
// // import { getNotes, createNote } from '../features/notes/noteSlice'
// // import BackButton from '../components/BackButton'
// // import Spinner from '../components/Spinner'
// // import NoteItem from '../components/NoteItem'

// const customStyles = {
//   content: {
//     width: '600px',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     position: 'relative',
//   },
// }

// Modal.setAppElement('#root')

// function SingleTicket() {
//   //   const [modalIsOpen, setModalIsOpen] = useState(false)
//   //   const [noteText, setNoteText] = useState('')
//   //   const { ticket } = useSelector((state) => state.tickets)

//   //   const { notes } = useSelector((state) => state.notes)

//   // NOTE: no need for two useParams
//   const { ticketId } = useParams()
//   console.log(ticketId, 'ticketId')

//   //   const navigate = useNavigate()
//   //   const dispatch = useDispatch()
//   console.log('SingleTicket')

//   useEffect(() => {
//     const getSingleTicketData = async () => {
//       const data = await axios.get(
//         `http://localhost:5000/api/tickets/singleTicket/${ticketId}`,
//         {
//           withCredentials: true,
//         }
//       )
//       console.log(data.data, "data");
//     }
//     getSingleTicketData()
//   }, [ticketId])

//   // Close ticket
//     const onTicketClose = () => {
//       // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
//       // isSuccess state
//       // dispatch(closeTicket(ticketId))
//       //   .unwrap()
//       //   .then(() => {
//       //     toast.success('Ticket Closed')
//       //     navigate('/tickets')
//       //   })
//       //   .catch(toast.error)
//     }

//   //   // Create note submit
//   //   const onNoteSubmit = (e) => {
//   //     // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
//   //     // isSuccess state
//   //     e.preventDefault()
//   //     // dispatch(createNote({ noteText, ticketId }))
//   //     //   .unwrap()
//   //     //   .then(() => {
//   //     //     setNoteText('')
//   //     //     closeModal()
//   //     //   })
//   //     //   .catch(toast.error)
//   //   }

//   // Open/close modal
//   //   const openModal = () => setModalIsOpen(true)
//   //   const closeModal = () => setModalIsOpen(false)

//   //   if (!ticket) {
//   //     return <Spinner />
//   //   }

//   return (
//     <div className='ticket-page'>
//       {/* <header className='ticket-header'>
//         <BackButton />
//         <h2>
//           Ticket ID: {ticket._id}
//           <span className={`status status-${ticket.status}`}>
//             {ticket.status}
//           </span>
//         </h2>
//         <h3>
//           Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
//         </h3>
//         <h3>Product: {ticket.product}</h3>
//         <hr />
//         <div className='ticket-desc'>
//           <h3>Description of Issue</h3>
//           <p>{ticket.description}</p>
//         </div>
//         <h2>Notes</h2>
//       </header> */}
//     </div>
//   )
// }

// export default SingleTicket

// {
//   /* <div className='ticket-page'>
// <header className='ticket-header'>
//   <BackButton />
//   <h2>
//     Ticket ID: {ticket._id}
//     <span className={`status status-${ticket.status}`}>
//       {ticket.status}
//     </span>
//   </h2>
//   <h3>
//     Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
//   </h3>
//   <h3>Product: {ticket.product}</h3>
//   <hr />
//   <div className='ticket-desc'>
//     <h3>Description of Issue</h3>
//     <p>{ticket.description}</p>
//   </div>
//   <h2>Notes</h2>
// </header>

// {ticket.status !== 'closed' && (
//   <button onClick={openModal} className='btn'>
//     <FaPlus /> Add Note
//   </button>
// )} */
// }

// {
//   /* <Modal
//   isOpen={modalIsOpen}
//   onRequestClose={closeModal}
//   style={customStyles}
//   contentLabel='Add Note'
// >
//   <h2>Add Note</h2>
//   <button className='btn-close' onClick={closeModal}>
//     X
//   </button>
//   <form onSubmit={onNoteSubmit}>
//     <div className='form-group'>
//       <textarea
//         name='noteText'
//         id='noteText'
//         className='form-control'
//         placeholder='Note text'
//         value={noteText}
//         onChange={(e) => setNoteText(e.target.value)}
//       ></textarea>
//     </div>
//     <div className='form-group'>
//       <button className='btn' type='submit'>
//         Submit
//       </button>
//     </div>
//   </form>
// </Modal> */
// }

// {
//   /* {notes ? (
//   notes.map((note) => <NoteItem key={note._id} note={note} />)
// ) : (
//   <Spinner />
// )} */
// }

// {
//   /* {ticket.status !== 'closed' && (
//   <button onClick={onTicketClose} className='btn btn-block btn-danger'>
//     Close Ticket
//   </button>
// )} */
// }
// {
//   /* </div> */
// }


import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function SingleTicket() {
  const { ticketId } = useParams()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getSingleTicketData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tickets/singleTicket/${ticketId}`,
          { withCredentials: true }
        )
        setTicket(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch ticket')
      } finally {
        setLoading(false)
      }
    }

    getSingleTicketData()
  }, [ticketId])

  if (loading) return <p>Loading ticket details...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  )
}

export default SingleTicket
