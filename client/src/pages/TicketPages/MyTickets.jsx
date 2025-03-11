import { useState, useEffect } from 'react'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import TicketItem from '../../components/TicketItem'


function MyTickets() {
  const [tickets, setTickets] = useState([]) // State to store tickets
  const [loading, setLoading] = useState(true) // State to track loading
  const [error, setError] = useState(null) // State to track errors

  useEffect(() => {
    // Function to fetch tickets from API
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tickets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials (cookies)
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch tickets')
        }

        const data = await response.json()
        setTickets(data) // Store the fetched tickets in state
        setLoading(false) // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message) // Set error message if there's an issue
        setLoading(false) // Set loading to false even on error
      }
    }

    fetchTickets()
  }, []) // Empty dependency array means it runs once when the component mounts

  // If tickets are still loading, show the spinner
  if (loading) {
    return <Spinner />
  }

  // If there's an error, display the error message
  if (error) {
    return <p className="error">{error}</p>
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
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default MyTickets;
